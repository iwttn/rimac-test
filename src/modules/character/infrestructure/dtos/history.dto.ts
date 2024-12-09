import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";

export class SearchHistoryPaginateQueryDTO {
    @IsNotEmpty({ message: '`page` param is requiered.' })
    @IsNumber({}, { message: '`page` param must be type `number`' })
    @Type(() => Number)
    page: number;

    @IsNotEmpty({ message: '`limit` param is requiered' })
    @IsNumber({}, { message: '`limit` param must be type `number`' })
    @Type(() => Number)
    limit: number;

}