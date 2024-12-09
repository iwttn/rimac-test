import { Module } from "@nestjs/common";
import { StorageController } from './infrestructure/controllers/storage.controller'
import { StorageDynamoDBRepository } from "./infrestructure/repositories/storage.repository";
import { StorageService } from "./infrestructure/services/storage.service";

@Module({
    imports: [],
    controllers: [
        StorageController
    ],
    providers: [
        StorageDynamoDBRepository,
        StorageService
    ]
})
export class StorageModule { }