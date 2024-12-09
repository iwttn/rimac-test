import { Controller, Get, InternalServerErrorException, NotFoundException, Query, Res } from "@nestjs/common";
import { HistoryService } from "../services/history.service";
import { SearchHistoryPaginateQueryDTO } from "../dtos/history.dto";
import { Response } from "express";


@Controller('historial')
export class HistoryController {
    constructor(
        private readonly historyService: HistoryService
    ) {}

    @Get()
    async getAllHistory(
        @Query() query: SearchHistoryPaginateQueryDTO,
        @Res() res: Response
    ) {
        try {
            const { limit, page } = query;
            const { currentPage, data, nextPage } = await this.historyService.getAllHistory(page, limit);
            return  res.status(200).json({ currentPage, nextPage, data});
        } catch (e) {
            if(e instanceof NotFoundException) {
                throw e
            } else { 
                console.error(e.message);
                throw new InternalServerErrorException('An error occurred getting the history.');
            }
        }
    }
}