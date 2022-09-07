import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
      @InjectRepository(User)
      private readonly userRepo: Repository<User>
  ) {}

  async createUser(userData: CreateUserDto) {
    try {
      userData.password = await bcrypt.hash(userData.password, 10);
      const output = await this.userRepo.save(userData)
      delete output.password
      return output
    } catch (e) {
      throw new HttpException('User cannot be created', HttpStatus.BAD_GATEWAY)
    }
  }

  async findAllUsers() {
    try {
      return await this.userRepo.find()
    } catch (e) {
      throw new HttpException('User cannot be found', HttpStatus.NOT_FOUND)
    }
  }

  async findOne(id: string) {
    try {
      return await this.userRepo.findOne({where: {id: id}})
    } catch (e) {
      throw new HttpException('User cannot be found', HttpStatus.NOT_FOUND)
    }
  }

  async findOneByEmail(email: string) {
    try {
      return await this.userRepo.findOne({where: {email: email}})
    } catch (e) {
      throw new HttpException('User cannot be found', HttpStatus.NOT_FOUND)
    }
  }

  async update(id: string, newUser: UpdateUserDto) {
    const oldUser = await this.userRepo.findOne({where: {id: id} })

    if(!oldUser){
      return new HttpException('Update failed', HttpStatus.NOT_FOUND);
    }
    const updateUser = Object.assign(oldUser, newUser)

    return await this.userRepo.save(updateUser)
  }

  async remove(id: string) {
    const deletedProduct = await this.userRepo.findOne({where: {id} })

    if(!deletedProduct){
      return new HttpException('Remove failed', HttpStatus.NOT_FOUND);
    }

    await this.userRepo.delete(id)

    return deletedProduct
  }
}
