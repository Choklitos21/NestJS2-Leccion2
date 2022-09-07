import {
    IsEmail,
    IsNotEmpty,
    IsString,
    MaxLength, MinLength
} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {

    @ApiProperty({ type: String })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ type: String })
    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    full_name: string;

    @ApiProperty({ type: String })
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(50)
    password: string;

}
