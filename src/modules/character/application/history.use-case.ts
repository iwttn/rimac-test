import { HistoryRepository } from "../domain/history.repository";
import { History } from '../domain/history'

export class HistoryUseCase {
    constructor(private readonly historyRepository: HistoryRepository) {}

    async createHistory(history: History) {
        const historyCreated = await this.historyRepository.createHistory(history);
        return historyCreated;
    }

    async getAllHistory(page: number, limit: number) {
        const allHistory = await this.historyRepository.getHistory(page, limit);
        return allHistory;
    }
}