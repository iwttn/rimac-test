import { Test, TestingModule } from '@nestjs/testing'
import { CacheDynamoDBRepository } from 'src/modules/character/infrestructure/repositories/cache.repositoty';
import { CacheService } from 'src/modules/character/infrestructure/services/cache.service';

describe('CacheService', () => {
    let service: CacheService;

    const mockCacheDynamoDBRepository = {
        createCache: jest.fn().mockResolvedValue(true),
        getCache: jest.fn().mockResolvedValue(JSON.stringify({ ping: "pong" }))
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CacheService,
                { provide: CacheDynamoDBRepository, useValue: mockCacheDynamoDBRepository },
            ]
        }).compile();

        service = module.get<CacheService>(CacheService);
    })

    it('should be defined', () => {
        expect(service).toBeDefined();
    })

    it('should create cache', async () => {
        const result = await service.createCache('http://api.com/api', JSON.stringify({}), 36000);
        expect(result).toEqual(true)
    })

    it('should get cache', async () => {
        const result = await service.getCache('http://api.com/api');
        expect(result).toEqual(JSON.stringify({ ping: "pong" }))
    })
})