import { Type } from 'class-transformer';
import { IsOptional, Min, IsPositive } from 'class-validator';

export class PaginationDto {

    @IsOptional()
    @IsPositive()
    @Type(() => Number) //enableImplicitConversion: true
    limit?: number;

    @IsOptional()
    @Min(0)
    @Type(() => Number) //enableImplicitConversion: true
    offset?: number;
}