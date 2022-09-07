import { Injectable } from '@nestjs/common';
import {UserService} from "../user/user.service";
import {CreateUserDto} from "../user/dto/create-user.dto";

@Injectable()
export class AuthService {

  constructor(
      private readonly userService: UserService
  ) {}

  async createUser(authInfo: CreateUserDto) {
    return await this.userService.createUser(authInfo);
  }

  async validateUser(authInfo: CreateUserDto) {
    return await this.userService.findOneByEmail(authInfo.email);
  }

}
