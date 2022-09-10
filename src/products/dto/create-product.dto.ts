import {
    IsNotEmpty,
    IsNumber,
    IsString,
    MaxLength,
    Min,
    MinLength
} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../../user/entities/user.entity";
import {Exclude} from "class-transformer";

export class CreateProductDto {
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

    @ApiProperty({type: User})
    @Exclude()
    user: User;

}
