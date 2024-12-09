export interface CacheRepository {
    createCache(id: string, payload: string, ttl: number): Promise<any>;
    getCache(id: string): Promise<string | null>;
}