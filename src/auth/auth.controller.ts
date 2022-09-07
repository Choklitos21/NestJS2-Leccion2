import { Controller, Post, Body, } from '@nestjs/common';
import { AuthService } from './auth.service';
import {CreateUserDto} from "../user/dto/create-user.dto";
import {ApiTags} from "@nestjs/swagger";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  createUser(@Body() authInfo: CreateUserDto) {
    return this.authService.createUser(authInfo);
  }

  @Post('/validate')
  loginUser(@Body() authInfo: CreateUserDto) {
    return this.authService.validateUser(authInfo);
  }

}
