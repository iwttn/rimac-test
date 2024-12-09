import { configure } from '@codegenie/serverless-express'
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Handler, Context, Callback } from 'aws-lambda'
import { ValidationPipe } from '@nestjs/common';
import { HistoryHandler } from './modules/character/infrestructure/handler/history.handler';

let server: Handler;

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { logger: false });
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
        })
    );
    await app.init();

    const expressHandler = await app.getHttpAdapter().getInstance();

    return configure({ app: expressHandler })
}

export const handler: Handler = async (
    event: any,
    context: Context,
    callback: Callback
) => {
    server = server ?? await bootstrap();
    return server(event, context, callback);
}

export const createHistoryHandler: Handler = async (event: any) => {
    const appContext = await NestFactory.create(AppModule);
    const eventService = appContext.get(HistoryHandler);
    return eventService.createHistory(event)
}