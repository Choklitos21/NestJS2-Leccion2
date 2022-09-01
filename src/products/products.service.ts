import {Injectable, Logger} from '@nestjs/common';
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

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
