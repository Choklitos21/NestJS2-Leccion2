import { Product } from "./entities/product.entity";
import { Repository } from "typeorm";
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from "@nestjs/typeorm";
import {
  Logger,
  HttpStatus,
  HttpException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class ProductsService {

  private readonly logger = new Logger('ProductsService');

  constructor(
      @InjectRepository(Product)
      private readonly productRepo: Repository<Product>
  ) {
  }

  async createProduct(data: CreateProductDto): Promise<Product> {
    try {
      return await this.productRepo.save(data)
    } catch (e) {
      throw new HttpException('User cannot be created', HttpStatus.BAD_GATEWAY)
    }
  }

  async findAllProducts(): Promise<Product[]> {
    try {
      return await this.productRepo.find();
    } catch (e) {
      throw new HttpException('Users not found', HttpStatus.NOT_FOUND)
    }
  }

  async findOne(id: number): Promise<Product | HttpException> {
    const res = await this.productRepo.findOneBy({id});
    if(!res){
      throw new HttpException('User cannot be found', HttpStatus.NOT_FOUND)
    }
    return res
  }

  async update(id: number, updateData: UpdateProductDto): Promise<Product | HttpException> {
    const user = await this.productRepo.findOne({where: {id} })

    if(!user){
      throw new HttpException({
        message: 'User cannot be updated',
            why: 'User not found',},
          HttpStatus.BAD_GATEWAY)
    }
    const updateUser = Object.assign(user, updateData)

    return await this.productRepo.save(updateUser)
  }

  async remove(id: number): Promise<Product | HttpException> {
    const deletedProduct = await this.productRepo.findOne({where: {id} })

    if(!deletedProduct){
      throw new HttpException({
            message: 'User cannot be deleted',
            why: 'User not found',},
          HttpStatus.BAD_GATEWAY)
    }

    await this.productRepo.delete(id)
    return deletedProduct
  }

}
