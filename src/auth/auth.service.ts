import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {UserService} from "../user/user.service";
import {CreateUserDto} from "../user/dto/create-user.dto";
import * as bcrypt from 'bcrypt';
import {LoginUserDto} from "./dto/login-user.dto";

@Injectable()
export class AuthService {

  constructor(
      private readonly userService: UserService
  ) {}

  async createUser(authInfo: CreateUserDto) {
    return await this.userService.createUser(authInfo);
  }

  async validateUser(authInfo: LoginUserDto) {
    const user = await this.userService.findOneByEmail(authInfo.email)
    if(user){
      const validate = bcrypt.compare(authInfo.password, user.password)
      if(validate){
        delete user.password
        return {
          message: 'Login correctly',
          data: user
        }
      }else {
        throw new HttpException('Password is incorrect', HttpStatus.BAD_GATEWAY)
      }
    }else {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }
  }

}
