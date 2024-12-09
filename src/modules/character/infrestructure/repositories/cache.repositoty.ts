import { Injectable, NotFoundException } from "@nestjs/common";
import { HistoryRepository } from "../../domain/history.repository";
import { History } from "../../domain/history";
import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import { DYNAMODB_REGION, DYNAMODB_FUSION_CACHE_TABLE } from 'src/shared/constants'
import { CacheRepository } from "../../domain/cache.repository";


@Injectable()
export class CacheDynamoDBRepository implements CacheRepository {
    private readonly dynamoDbDocument: DynamoDBDocument;

    constructor() {
        this.dynamoDbDocument = DynamoDBDocument.from(new DynamoDB({ region: DYNAMODB_REGION }))
    }

    async createCache(id: string, payload: string, ttl: number): Promise<any> {
        try {
            /** Input para almacenar el history */
            const input = {
                TableName: DYNAMODB_FUSION_CACHE_TABLE,
                Item: { id, payload, ttl }
            }

            /** Guardamos el registro en la tabla */
            const documentResponse = await this.dynamoDbDocument.send(new PutCommand(input));
            /** Validamos que se haya guardad satisfactoriamente */
            return documentResponse?.$metadata?.httpStatusCode === 200;
        } catch (e) {
            throw e;
        }
    }

    async getCache(id: string): Promise<string | null> {
        try {
            /** Consultamos el documento por el id */
            const documentResponse = await this.dynamoDbDocument.get({
                TableName: DYNAMODB_FUSION_CACHE_TABLE,
                Key: { id }
            })
            
            return documentResponse.Item?.payload ?? null;
        } catch(e) {
            throw e;
        }
    }
}