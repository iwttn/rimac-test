import { API_IMDB_URL } from "src/shared/constants";
import { fetchData, getDateInSeconds } from "src/shared/helpers";
import { ApiImdbGetFilmResponse } from "./types/imdb-client";
import { X_RAPIDAPI_HOST, X_RAPIDAPI_KEY } from 'src/shared/constants'
import { Injectable } from "@nestjs/common";
import { CacheService } from "../services/cache.service";

/**
 * @description Cliente de la api imdb
 */
@Injectable()
export class ImdbClient {
    constructor(private readonly cacheService: CacheService) {}
    /**
     * @description
     */
    async getMovieById(id: string) {
        /** Construimos la url completa */
        const fullUrl = `${API_IMDB_URL}/${id}`;

        try {
            /** Buscamos si este dato fue cacheado */
            const cache = await this.cacheService.getCache(fullUrl);
            
            /** Si exite en la cache retornamos el payload tranformado */
            if(cache) return new Promise(resolve => resolve(JSON.parse(cache)));

            /** Hacemos una peticion a la api */
            const fetchResponse = await fetchData<ApiImdbGetFilmResponse>(fullUrl, { 
              headers: {
                'x-rapidapi-key': X_RAPIDAPI_KEY,
                'x-rapidapi-host': X_RAPIDAPI_HOST
              }
            });

            /** Cacheamos la respuesta por 30 minutos*/
            await this.cacheService.createCache(fullUrl, JSON.stringify(fetchResponse), getDateInSeconds() + 1800);

            /** Devolvemos la respuesta */
            return fetchResponse;
        } catch (e) {
            console.error('There was a problem getting the specific movie.');
            throw e;
        }
    }
}