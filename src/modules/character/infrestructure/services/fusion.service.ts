import { Injectable } from '@nestjs/common';
import { PaginateParams } from 'src/shared/types/paginate';
import { SwapiClient } from '../clients/swapi.client';
import { imdbFilmIdMap } from 'src/shared/constants/film-id-map'
import { ImdbClient } from '../clients/imdb.client';
import { type ApiImdbFilm } from '../clients/types/imdb-client'
import { Fusion } from '../../domain/fusion';
import { Film } from '../../domain/film';
import { HistoryEvent } from '../events/history.event';

@Injectable()
export class FusionService {
    constructor(
        private readonly swapiClient: SwapiClient,
        private readonly imbdClient: ImdbClient,
        private readonly historyEvent: HistoryEvent
    ) {}

    /**
     * 
     * @description Obtiene un dato fusionado de SWAPI y IMDB
     */
    async getFusion(id: string | number) {
        try {
            /** Obtenemos el personaje desde el cliente */
            const character = await this.swapiClient.getCharacterById(id);

            /** Cambiamos el arreglo de films por un arreglo de imdbid */
            character.films = character.films.map(film => {
                /** Obtenemos el id que bien el url(ex: https://swapi.dev/api/films/6/) */
                const id = film.split('/').reverse()[1];
                /** Buscamos en mapeo de ids de imdb y lo retornamos */
                return imdbFilmIdMap[id];
            })

            /** Consultamos informacion de las peliculas en base a los imdbIds */
            const filmsPromises = [...character.films].map(filmId => this.imbdClient.getMovieById(filmId));
            const imdbFilms = await Promise.all(filmsPromises) as ApiImdbFilm[];

            /** Construimos al estructura de la respuesta que se enviara al controlador */
            const films = imdbFilms.map(imdbFilm => {
                return new Film(
                    imdbFilm.id,
                    imdbFilm.primaryTitle,
                    imdbFilm.genres,
                    imdbFilm.runtimeMinutes,
                    imdbFilm.description,
                    imdbFilm.primaryImage,
                    imdbFilm.releaseDate,
                    imdbFilm.directors.map(dir => dir.fullName),
                    imdbFilm.budget,
                    imdbFilm.grossWorldwide
                )
            })

            /**Obtenemos el id en base a la url referente a swapi */
            const characterId = character.url.split('/').reverse()[1];

            /** Creamos una `Fusion` */
            const fusion = new Fusion(characterId, character.name, character.height, character.mass, character.gender, character.birth_year, films);

            /** Enviamos el evento para crear el historial */
            await this.historyEvent.sendCreateHistoryEvent({ payload: JSON.stringify(fusion), typeHistory: 'unique' })

            return fusion;

        } catch(e) {
            throw e;
        }
    }

    /**
     * 
     * @description Obtiene los datos fusionados de SWAPI y IMDB
     */
    async getAllFusions(params: Omit<PaginateParams, 'totalPerPage'>) {
        try {
            /** Obtenemos los personajes desde el cliente */
            const { results: characters, next } = await this.swapiClient.getAllCharacters(params);

            /** 
             * Primero obtemos todos los ids de los films a partir de la url 
             * Luego obtemos su equivalente de imdb film id
             */
            const filmIdsSetter = new Set<string>();

            for(let i = 0; i < characters.length; i++) {
                const result = characters[i];
                /** Cambiamos el arreglo de films por un arreglo de imdbid */
                characters[i].films = result.films.map(film => {
                    /** Obtenemos el id que bien el url(ex: https://swapi.dev/api/films/6/) */
                    const id = film.split('/').reverse()[1];
                    /** Buscamos en mapeo de ids de imdb */
                    const imdbFilmId = imdbFilmIdMap[id];
                    /** Agregamos al set de ids para evitar ids repetidos  */
                    filmIdsSetter.add(imdbFilmId);
                    return imdbFilmId;
                })
            }

            /** Consultamos informacion de las peliculas en base a los imdbIds */
            const filmsPromises = [...filmIdsSetter].map(filmId => this.imbdClient.getMovieById(filmId));
            const imdbFilms = await Promise.all(filmsPromises) as ApiImdbFilm[];
        
            /** Creamos un Map de cada imdbFilm y lo relacionamos a su imdbid para un busqueda rapida */
            const imdbFilmsMap = new Map<string, ApiImdbFilm>(
                imdbFilms.map((film) => [film.id, film] )
            );

            /** Construimos al estructura de la respuesta que se enviara al controlador */
            const fusions = characters.map(character => {

                const films = character.films.map((filmId) => {
                    const imdbFilm = imdbFilmsMap.get(filmId);

                    return new Film(
                        imdbFilm.id,
                        imdbFilm.primaryTitle,
                        imdbFilm.genres,
                        imdbFilm.runtimeMinutes,
                        imdbFilm.description,
                        imdbFilm.primaryImage,
                        imdbFilm.releaseDate,
                        imdbFilm.directors.map(dir => dir.fullName),
                        imdbFilm.budget,
                        imdbFilm.grossWorldwide
                    )
                })

                /**Obtenemos el id en base a la url referente a swapi */
                const characterId = character.url.split('/').reverse()[1];

                return new Fusion(characterId, character.name, character.height, character.mass, character.gender, character.birth_year, films);
            });

            /** Enviamos el evento para crear el historial */
            await this.historyEvent.sendCreateHistoryEvent({ payload: JSON.stringify(fusions), typeHistory: 'many' })

            return { 
                fusions,
                currentPage: params.page,
                nextPage: next ? params.page + 1 : null
            };
            
        } catch (e) {
            throw e;
        }
    }
}
