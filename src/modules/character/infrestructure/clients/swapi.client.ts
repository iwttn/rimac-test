import { fetchData, getDateInSeconds } from '../../../../shared/helpers'
import { API_SWAPI_URL } from '../../../../shared/constants'
import { type ApiSwapiGetAllPeopleResponse, type ApiSwapiPeople, type ApiSwapiGetPeopleResponse } from './types/swapi-client'
import { type PaginateParams } from 'src/shared/types/paginate';
import { CacheService } from '../services/cache.service';
import { Injectable } from '@nestjs/common';

/**
 * @description Cliente de la api de starwars
 */
@Injectable()
export class SwapiClient {
    constructor(private readonly cacheService: CacheService) {}
    /**
     * @description Obtiene todos los personajes de starwars en base a una paginacion
     */
    async getAllCharacters(params: Omit<PaginateParams, 'totalPerPage'>) {
        /** Obtenemos la pagina que se consultara */
        const { page } = params;
        /** Construimos la url completa */
        const fullUrl = `${API_SWAPI_URL}/people?page=${page}`;

        try {
            /** Buscamo si este dato fue cacheado */
            const cache = await this.cacheService.getCache(fullUrl);

            /** Si exite en la cache retornamos el payload tranformado */
            if(cache) return JSON.parse(cache);

            /** Hacemos una peticion a la api */
            const fetchResponse = await fetchData<ApiSwapiGetAllPeopleResponse<ApiSwapiPeople>>(fullUrl, { headers: {}});

            /** Cacheamos la respuesta por 30 minutos*/
            await this.cacheService.createCache(fullUrl, JSON.stringify(fetchResponse), getDateInSeconds() + 1800);

            /** Devolvemos la respuesta */
            return fetchResponse;
        } catch (e) {
            throw e;
        }
    }
    
    /**
     * @description Obtiene un personaje de starwars en especifico
     */
    async getCharacterById(id: number | string) {
        /** Construimos la url completa */
        const fullUrl = `${API_SWAPI_URL}/people/${id}`;

        try {
            /** Buscamo si este dato fue cacheado */
            const cache = await this.cacheService.getCache(fullUrl);

            /** Si exite en la cache retornamos el payload tranformado */
            if(cache) return JSON.parse(cache);

            /** Hacemos una peticion a la api */
            const fetchResponse = await fetchData<ApiSwapiGetPeopleResponse>(fullUrl, { headers: {}});

            /** Cacheamos la respuesta por 30 minutos*/
            await this.cacheService.createCache(fullUrl, JSON.stringify(fetchResponse), getDateInSeconds() + 1800);

            /** Devolvemos la respuesta */
            return fetchResponse;
        } catch (e) {
            throw e;
        }
    }
}