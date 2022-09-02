import {HttpException, HttpStatus, Injectable, Logger} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Product} from "./entities/product.entity";

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
      this.logger.error({
        message: 'Error al crear el producto',
        error: e,
      })
    }
  }

  async findAllProducts(): Promise<Product[]> {
    try {
      return await this.productRepo.find();
    } catch (e) {
      this.logger.error({
        message: 'Error al crear el producto',
        error: e,
      })
    }
  }

  async findOne(id: number): Promise<Product | HttpException> {
    const res = await this.productRepo.findOneBy({id});
    if(!res){
      this.logger.error({
        message: `Error finding product for id:${id}`,
        status: 404,
      })
      return new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    return res
  }

  async update(id: number, updateData: UpdateProductDto): Promise<Product | HttpException> {
    const user = await this.productRepo.findOne({where: {id} })

    if(!user){
        this.logger.error({
          message: `Product not found for id:${id}`,
        })
        return new HttpException('Update failed', HttpStatus.NOT_FOUND);
    }
    const updateUser = Object.assign(user, updateData)

    return await this.productRepo.save(updateUser)
  }

  async remove(id: number): Promise<Product | HttpException> {
    const deletedProduct = await this.productRepo.findOne({where: {id} })

    if(!deletedProduct){
      this.logger.error({
        message: `Product not found for id:${id}`,
      })
      return new HttpException('Update failed', HttpStatus.NOT_FOUND);
    }

    await this.productRepo.delete(id)
    return deletedProduct
  }

}
