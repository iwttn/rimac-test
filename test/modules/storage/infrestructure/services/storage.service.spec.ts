import { Test, TestingModule } from '@nestjs/testing'
import { StorageDynamoDBRepository } from 'src/modules/storage/infrestructure/repositories/storage.repository';
import { StorageService } from 'src/modules/storage/infrestructure/services/storage.service'

describe('StorageService', () => {
    let service: StorageService;

    const mockStorageDynamoDBRepository = {
        createPersonalization: jest.fn().mockResolvedValue(true)
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                StorageService,
                { provide: StorageDynamoDBRepository, useValue: mockStorageDynamoDBRepository },
            ]
        }).compile();

        service = module.get<StorageService>(StorageService);
    })

    it('should be defined', () => {
        expect(service).toBeDefined();
    })

    it('should create personalize data', async () => {
        const result = await service.createPersonalization({ ping: "pong", itsArray: ["1", "2"], itsObject: { a: "A" } });
        expect(result).toEqual(true)
    })
})