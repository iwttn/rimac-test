import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";

export class SearchFusionsPaginateQueryDTO {
    @IsNotEmpty({ message: '`page` param is requiered.' })
    @IsNumber({}, { message: '`page` param must be type `number`' })
    @Type(() => Number)
    page: number;
}