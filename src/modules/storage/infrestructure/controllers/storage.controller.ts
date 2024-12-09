import { BadRequestException, Body, Controller, Get, InternalServerErrorException, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { StorageService } from '../services/storage.service';

@Controller('almacenar')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Post()
  async storagePersonalization(@Body() body: Record<string, unknown>, @Res() res: Response) {
    try {
      /** Validamos que el exista data personalizada */
      if(Object.keys(body).length === 0) throw new BadRequestException('The request body cannot be empty.');

      /** Llamamos al servicio para crear  */
      const personalizationCreated  = await this.storageService.createPersonalization(body);
      /** Validamos que haya sido guardado */
      if(!personalizationCreated) throw new InternalServerErrorException;

      return res.status(201).json({ message: 'Successfully created' });

    } catch(e) {
      if(e instanceof BadRequestException) {
        throw e;
      } else {
        console.error(e.message);
        throw new InternalServerErrorException('An error occurred creating the info personalization.');
      }
    }
  }
}