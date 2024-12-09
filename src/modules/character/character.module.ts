import { Module } from "@nestjs/common";
import { FusionController } from './infrestructure/controllers/fusion.controller'
import { FusionService } from "./infrestructure/services/fusion.service";
import { SwapiClient } from "./infrestructure/clients/swapi.client";
import { ImdbClient } from "./infrestructure/clients/imdb.client";
import { HistoryService } from "./infrestructure/services/history.service";
import { HistoryDynamoDBRepository } from "./infrestructure/repositories/history.repository";
import { HistoryHandler } from "./infrestructure/handler/history.handler";
import { HistoryEvent } from "./infrestructure/events/history.event";
import { HistoryController } from "./infrestructure/controllers/history.controller";
import { CacheService } from "./infrestructure/services/cache.service";
import { CacheDynamoDBRepository } from "./infrestructure/repositories/cache.repositoty";

@Module({
    imports: [],
    controllers: [
        FusionController,
        HistoryController
    ],
    providers: [
        FusionService,
        SwapiClient,
        ImdbClient,
        HistoryService,
        HistoryHandler,
        HistoryEvent,
        HistoryDynamoDBRepository,
        CacheService,
        CacheDynamoDBRepository
    ]
})
export class CharacterModule { }