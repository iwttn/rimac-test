export const DYNAMODB_PERSONALIZATION_TABLE = process.env.DYNAMODB_PERSONALIZATION_TABLE || 'rimac-test-dev-PersonalizationTable';
export const DYNAMODB_FUSION_CACHE_TABLE = process.env.DYNAMODB_FUSION_CACHE_TABLE || 'rimac-test-dev-FusionCacheTable';
export const DYNAMODB_FUSION_HISTORY_TABLE = process.env.DYNAMODB_FUSION_HISTORY_TABLE || 'rimac-test-dev-FusionHistoryTable';

export const DYNAMODB_REGION = process.env.DYNAMODB_REGION || 'us-east-1';
export const EVENTBRIDGE_HISTORY_REGION = process.env.EVENTBRIDGE_HISTORY_REGION || 'us-east-1';
export const EVENT_BUS_HISTORY_NAME = process.env.EVENT_BUS_HISTORY_NAME || 'rimac-test-dev-EventBus';

export const X_RAPIDAPI_KEY = process.env.X_RAPIDAPI_KEY || '5628f5b6a6msh9dd8e43e6ded0d5p144aaajsncf22cf1b46eb'
export const X_RAPIDAPI_HOST = process.env.X_RAPIDAPI_HOST || 'imdb236.p.rapidapi.com'