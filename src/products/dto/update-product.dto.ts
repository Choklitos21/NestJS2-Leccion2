import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import {IsNotEmpty, IsNumber, IsString, MaxLength, Min, MinLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class UpdateProductDto extends PartialType(CreateProductDto) {
    @ApiProperty({ type: String })
    @IsNotEmpty()
    @IsString()
    @MinLength(10)
    @MaxLength(250)
    name: string;

    @ApiProperty({ type: String })
    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @MaxLength(100)
    category: string;

    @ApiProperty({ type: Number })
    @IsNotEmpty()
    @IsNumber()
    @Min(1000)
    price: number;
}
