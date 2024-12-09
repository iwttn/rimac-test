import { Injectable } from "@nestjs/common";
import { CacheUseCase } from "../../application/cache.use-case";
import { CacheDynamoDBRepository } from "../repositories/cache.repositoty";

@Injectable()
export class CacheService {
    private readonly cacheUseCase: CacheUseCase;

    constructor(cacheDynamoDdRepository: CacheDynamoDBRepository){
        this.cacheUseCase = new CacheUseCase(cacheDynamoDdRepository);
    }

    async createCache(id: string, payload: string, ttl: number) {
        try {
            const cacheCreated = await this.cacheUseCase.createCache(id, payload, ttl);
            return cacheCreated;
        } catch(e) {
            console.error('Could not be cached');
        }
    }

    async getCache(id: string) {
        try {
            const cache = await this.cacheUseCase.getCache(id);
            return cache;
        } catch(e) {
            console.error('Could not get cache');
        }
    }
}