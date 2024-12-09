import { Module } from '@nestjs/common';
import { CharacterModule } from './modules/character/character.module'
import { StorageModule } from './modules/storage/storage.module'

@Module({
  imports: [
    CharacterModule,
    StorageModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
