import { Controller, Post, Body, } from '@nestjs/common';
import { AuthService } from './auth.service';
import {CreateUserDto} from "../user/dto/create-user.dto";
import {ApiBadRequestResponse, ApiBody, ApiOperation, ApiTags} from "@nestjs/swagger";
import {LoginUserDto} from "./dto/login-user.dto";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @ApiBody({ type: CreateUserDto })
  @ApiOperation({ operationId: "createUser", description: "Create a user" })
  @ApiBadRequestResponse({ description: "Error trying to create a user" })
  createUser(@Body() authInfo: CreateUserDto) {
    return this.authService.createUser(authInfo);
  }

  @Post('/validate')
  @ApiOperation({ operationId: "login", description: "Login with email & password" })
  @ApiBadRequestResponse({ description: "Error trying to login" })
  loginUser(@Body() authInfo: LoginUserDto) {
    return this.authService.validateUser(authInfo);
  }

}
