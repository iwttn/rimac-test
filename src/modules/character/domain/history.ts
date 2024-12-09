export class History { 
    id: string;
    createdAt: string;
    payload: string;
    typeHistory: 'unique' | 'many';

    constructor(id: string, createdAt: Date, payload: string, typeHistory: 'unique' | 'many') {
        this.id = id;
        this.createdAt = createdAt.toISOString();
        this.payload = payload;
        this.typeHistory = typeHistory;
    }
}