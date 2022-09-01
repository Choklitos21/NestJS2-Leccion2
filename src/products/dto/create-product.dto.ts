import {
    IsNotEmpty,
    IsNumber,
    IsString,
    MaxLength,
    Min,
    MinLength
} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateProductDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(10)
    @MaxLength(250)
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(10)
    @MaxLength(250)
    category: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    @Min(1000)
    price: number;

}
