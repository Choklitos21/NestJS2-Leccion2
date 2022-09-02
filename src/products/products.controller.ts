import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UsePipes,
  UseFilters
} from '@nestjs/common';

import { ProductsService } from './products.service';
/* Dto's */
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
/* Entity */
import { Product } from "./entities/product.entity";
/* HttpExceptions filter */
import { HttpExceptionFilter } from "../config/HttpExceptions/http-exception.filter";

@Controller('products')
@UseFilters(new HttpExceptionFilter())
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('addProduct')
  @UsePipes(new ValidationPipe({transform: true}))
  createUserResponseDto(@Body() productData: CreateProductDto) {
    return this.productsService.createProduct(productData);
  }

  @Get('getAll')
  @UsePipes(new ValidationPipe({transform: true}))
  findAll(): Promise<Product[]> {
    return this.productsService.findAllProducts();
  }

  @Get('getBy/:id')
  @UsePipes(new ValidationPipe({transform: true}))
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch('update/:id')
  @UsePipes(new ValidationPipe({transform: true}))
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete('delete/:id')
  @UsePipes(new ValidationPipe({transform: true}))
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
