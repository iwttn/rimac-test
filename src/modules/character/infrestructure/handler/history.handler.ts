import { Injectable } from "@nestjs/common"
import { HistoryEventDetail } from './types/history.handler'
import { HistoryService } from "../services/history.service";

@Injectable()
export class HistoryHandler {
    constructor(
        private readonly historyService: HistoryService
    ) {}

    async createHistory(event: { detail: HistoryEventDetail }) {
        const { detail } = event ?? {};
    
        try {
            /** Validamos que exista un payload */
            if(!detail?.payload) throw new Error('Payload is required');

            /** Llamamos al servicio para crear el historial */
            const historyCreated = await this.historyService.createHistory(detail.payload, detail.typeHistory);

            /** Validamos que haya sido registrado el historial */   
            if(!historyCreated) throw new Error('An error occurred creating the history')
            
            return { message: 'Successfully created' };

        } catch(err) {
            console.error(err.message);
            return { message: err.message }
        }
    } 
}