import { Injectable } from "@nestjs/common";
import { HistoryDynamoDBRepository } from "../repositories/history.repository";
import { HistoryUseCase } from "../../application/history.use-case";
import { History } from "../../domain/history";

@Injectable()
export class HistoryService {
    private readonly historyUseCase: HistoryUseCase;

    constructor(historyDynamoDdRepository: HistoryDynamoDBRepository) {
        this.historyUseCase = new HistoryUseCase(historyDynamoDdRepository);
    }

    async createHistory(payload: string, typeHistory: 'unique' | 'many') {
        const id = crypto.randomUUID(); //Generamos un id unico para el historial
        const createdAt = new Date(); //Generamos la fecha y hora de creacion del historial

        try {
            /** Creamos un nuevo historial */
            const history = new History(id, createdAt, payload, typeHistory);

            /** Insertamos los datos en el repository de dynamodb */
            const historyCreated = await this.historyUseCase.createHistory(history);
            return historyCreated;
        } catch(e) {
            throw e;
        }
    }

    async getAllHistory(page: number, limit: number) {
        try {
            /** Obtenemos el historial */
            const allHistory = await this.historyUseCase.getAllHistory(page, limit);
            return allHistory;
        } catch (e) {
            throw e;
        }
    }
}

