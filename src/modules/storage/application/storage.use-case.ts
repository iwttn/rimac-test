import { StorageRepository } from "../domain/storage.repository";

export class StorageUseCase {
    constructor(private readonly storageRepository: StorageRepository) {}

    async createPersonalization(body: Record<string, unknown>) {
        const personalization = await this.storageRepository.createPersonalization(body);
        return personalization;
    }
}