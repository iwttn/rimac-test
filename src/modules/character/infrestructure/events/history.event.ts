import { EventBridgeClient, PutEventsCommand } from "@aws-sdk/client-eventbridge";
import { Injectable } from "@nestjs/common";
import { EVENTBRIDGE_HISTORY_REGION, EVENT_BUS_HISTORY_NAME } from 'src/shared/constants'
import { type HistoryEventDetail } from '../handler/types/history.handler'

@Injectable()
export class HistoryEvent {
    private readonly eventBridgeClient: EventBridgeClient;

    constructor() { 
        this.eventBridgeClient = new EventBridgeClient({ region:  EVENTBRIDGE_HISTORY_REGION });
    }

    async sendCreateHistoryEvent(detail: HistoryEventDetail): Promise<void> {
        /** Creamos el command para el evento */
        const command = new PutEventsCommand({ 
            Entries: [
                {   
                    Source: 'rimac-test-history',
                    DetailType: 'history.create',
                    Detail: JSON.stringify(detail)
                }
            ]
        });

        try {
            /** Enviamos el evento */
            const ebresponse = await this.eventBridgeClient.send(command);
            
            if(ebresponse?.$metadata?.httpStatusCode !== 200) throw new Error('Event cannot send');
        } catch(e) {
            console.error(e.message)
        }
    }
}