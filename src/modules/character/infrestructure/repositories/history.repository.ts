import { Injectable, NotFoundException } from "@nestjs/common";
import { HistoryRepository } from "../../domain/history.repository";
import { History } from "../../domain/history";
import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import { DYNAMODB_REGION, DYNAMODB_FUSION_HISTORY_TABLE } from 'src/shared/constants'


@Injectable()
export class HistoryDynamoDBRepository implements HistoryRepository {
    private readonly dynamoDbDocument: DynamoDBDocument;

    constructor() {
        this.dynamoDbDocument = DynamoDBDocument.from(new DynamoDB({ region: DYNAMODB_REGION }))
    }

    async createHistory(history: History): Promise<boolean> {
        try {
            /** Input para almacenar el history */
            const input = {
                TableName: DYNAMODB_FUSION_HISTORY_TABLE,
                Item: history
            }

            /** Guardamos el registro en la tabla */
            const documentResponse = await this.dynamoDbDocument.send(new PutCommand(input));

            /** Validamos que se haya guardad satisfactoriamente */
            return documentResponse?.$metadata?.httpStatusCode === 200;
        } catch (e) {
            throw e;
        }
    }

    async getHistory(page: number, limit: number): Promise<{ data: History[]; nextPage: number; currentPage: number; }> {
        try {
            /** Obtenemos los datos solicitados */
            let documentResponse = await this.dynamoDbDocument.scan({
                TableName: DYNAMODB_FUSION_HISTORY_TABLE,
                Limit: page > 1 ? ((page - 1) * limit) : page * limit
            });

            /** Validamos la pagina y si existen mas elementos */
            if(page === 1) {
                return {
                    currentPage: page,
                    nextPage: documentResponse.LastEvaluatedKey ? page + 1 : null,
                    data: documentResponse.Items as History[],
                }
            } 
            if(!documentResponse.LastEvaluatedKey) throw new NotFoundException(`Dont exists data for this page.`);

            documentResponse = await this.dynamoDbDocument.scan({
                TableName: DYNAMODB_FUSION_HISTORY_TABLE,
                ExclusiveStartKey: documentResponse.LastEvaluatedKey,
                Limit: limit
            })
            
            return {
                currentPage: page,
                nextPage: documentResponse.LastEvaluatedKey ? page + 1 : null,
                data: documentResponse.Items as History[],
            }

        } catch(e) {
            throw e;
        }
    }
}