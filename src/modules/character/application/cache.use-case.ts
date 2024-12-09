import { CacheRepository } from "../domain/cache.repository";

export class CacheUseCase {
    constructor(private readonly cacheRepository: CacheRepository) {}

    async createCache(id: string, payload: string, ttl: number) {
        const cacheCreated = await this.cacheRepository.createCache(id, payload, ttl);
        return cacheCreated;
    }

    async getCache(id: string) {
        const cache = await this.cacheRepository.getCache(id);
        return cache;
    }
}