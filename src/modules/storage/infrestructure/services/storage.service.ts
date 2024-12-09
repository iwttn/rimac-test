import { Injectable } from "@nestjs/common";
import { StorageUseCase } from "../../application/storage.use-case";
import { StorageDynamoDBRepository } from "../repositories/storage.repository";

@Injectable()
export class StorageService {
    private readonly storageUseCase: StorageUseCase;

    constructor(storageDynamoDdRepository: StorageDynamoDBRepository) {
        this.storageUseCase = new StorageUseCase(storageDynamoDdRepository);
    }

    async createPersonalization(body: Record<string, unknown>) {
        try {
            /** Insertamos los datos en el repository de dynamodb */
            const personalizationCreated = await this.storageUseCase.createPersonalization(body);
            return personalizationCreated;
        } catch(e) {
            throw e;
        }
    }
}

