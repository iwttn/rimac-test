import { Test, TestingModule } from '@nestjs/testing'
import { HistoryDynamoDBRepository } from 'src/modules/character/infrestructure/repositories/history.repository';
import { HistoryService } from 'src/modules/character/infrestructure/services/history.service';

describe('HistoryService', () => {
    let service: HistoryService;

    const mockHistoryDynamoDBRepository = {
        createHistory: jest.fn().mockResolvedValue(true),
        getHistory: jest.fn().mockResolvedValue({ currentPage: 1, nextPage: null, data: []})
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                HistoryService,
                { provide: HistoryDynamoDBRepository, useValue: mockHistoryDynamoDBRepository },
            ]
        }).compile();

        service = module.get<HistoryService>(HistoryService);
    })

    it('should be defined', () => {
        expect(service).toBeDefined();
    })

    it('should create history', async () => {
        const result = await service.createHistory(JSON.stringify({ data: {} }), 'unique');
        expect(result).toEqual(true)
    })

    it('should get history', async () => {
        const result = await service.getAllHistory(1, 10)
        expect(result).toEqual({ currentPage: 1, nextPage: null, data: []})
    })
})