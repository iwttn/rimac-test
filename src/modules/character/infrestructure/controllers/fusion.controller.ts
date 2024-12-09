import { Controller, Get, InternalServerErrorException, NotFoundException, Param, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { FusionService } from '../services/fusion.service';
import { SearchFusionsPaginateQueryDTO } from '../dtos/fusions.dto';

@Controller('fusionados')
export class FusionController {
  constructor(private readonly fusionService: FusionService) {}

  @Get()
  async getFusions(
    @Query() query: SearchFusionsPaginateQueryDTO,
    @Res() res: Response
  ) {
    try {
      const { page } = query;
      const { currentPage, fusions, nextPage } = await this.fusionService.getAllFusions({ page });
      return res.status(200).json({ currentPage, nextPage, data: fusions });

    } catch (e) {
      if(e.statusCode === 404) throw new NotFoundException('Dont exists data for this page');
      throw new InternalServerErrorException('An error occurred getting the fusions.');
    }
  }

  @Get(':id')
  async getFusionsByCharacterId(@Param('id') id: number | string, @Res() res: Response) {
    try {
      const fusion = await this.fusionService.getFusion(id)
      return res.status(200).json(fusion)
    } catch(e) {
      console.error(e.message)
      throw new InternalServerErrorException('An error occurred getting the fusion.');
    }
  }

}
