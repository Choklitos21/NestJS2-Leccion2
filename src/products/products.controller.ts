import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  Controller,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from "./entities/product.entity";
import { UserRoles } from "../utils/enums/enum-roles.enum";
import { Auth } from "../auth/decorators/auth.decorator";
import { GetUser } from "../auth/decorators/get-user.decorator";
import { User } from "../user/entities/user.entity";

@ApiTags('Products')
@Controller('products')
@ApiBearerAuth()
@Auth(UserRoles.ADMIN)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('addProduct')
  @UsePipes(new ValidationPipe({transform: true}))
  createUserResponseDto(@Body() productData: CreateProductDto, @GetUser() user: User) {
    return this.productsService.createProduct(productData, user);
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
