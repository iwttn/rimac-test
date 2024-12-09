export interface StorageRepository { 
    createPersonalization(body: Record<string, unknown>): Promise<boolean>;
}