export class ApiError extends Error {
    statusCode: number;

    constructor(message: string = '', statusCode: number) {
        super(message);
        this.name = 'ApiConsumeError';
        this.statusCode = statusCode ?? 500
    }
}