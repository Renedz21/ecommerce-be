import { IsString, Max, Min } from "class-validator";

export class CreateAuthDto {

    @IsString()
    name: string;

    @IsString()
    email: string;

    @IsString()
    @Min(6)
    @Max(20)
    password: string;

    @IsString()
    address: string;

    @IsString()
    phone: string;

    @IsString()
    dni: string;

}
