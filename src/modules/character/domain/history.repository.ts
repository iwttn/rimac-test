import { History } from "./history";

export interface HistoryRepository {
    createHistory(history: History): Promise<boolean>;
    getHistory(page: number, limit: number): Promise<{data: History[], nextPage: number, currentPage: number}>;
}