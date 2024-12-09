import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { StorageRepository } from "../../domain/storage.repository";
import { DynamoDBDocumentClient, PutCommand, PutCommandOutput } from '@aws-sdk/lib-dynamodb';
import { Injectable } from '@nestjs/common';
import { DYNAMODB_PERSONALIZATION_TABLE } from 'src/shared/constants'

@Injectable()
export class StorageDynamoDBRepository implements StorageRepository {
    private readonly dynamoDbClient: DynamoDBClient;
    private readonly dynamoDbDocument: DynamoDBDocumentClient;

    constructor() {
        this.dynamoDbClient = new DynamoDBClient({ region: 'us-east-1' });
        this.dynamoDbDocument = DynamoDBDocumentClient.from(this.dynamoDbClient);
    }

    async createPersonalization(body: Record<string, unknown>): Promise<boolean> {
        /** Creamos el id unico para cada registro */
        const id = crypto.randomUUID();
        /** Creamos las fecha en formato string para el ordenamiento */
        const createdAt = new Date().toISOString();
  
        try {
            /** Input para almacenar el body y la tabla */
            const input = {
                TableName: DYNAMODB_PERSONALIZATION_TABLE,
                Item: { id, createdAt, personalizeData: body }
            }

            /** Guardamos el registro en la tabla */
            const documentResponse = await this.dynamoDbDocument.send(new PutCommand(input));
            /** Validamos que se haya guardad satisfactoriamente */
            return documentResponse?.$metadata?.httpStatusCode === 200;
        } catch(e) {
            throw e;
        }
    }
}