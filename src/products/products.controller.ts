import {Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UsePipes} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {plainToInstance} from "class-transformer";
import {ReadProductDto} from "./dto/read-product.dto";
import {Product} from "./entities/product.entity";

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('add/product')
  @UsePipes(new ValidationPipe({transform: true}))
  createUserResponseDto(@Body() productData: CreateProductDto): ReadProductDto{

    const respuesta = this.productsService.createProduct(productData);

    return plainToInstance(ReadProductDto, respuesta, {
      excludeExtraneousValues: true,
    });
  }

  @Get()
  findAll(): Promise<Product[]> {
    return this.productsService.findAllProducts();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
