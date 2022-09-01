import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Product} from "./products/entities/product.entity";
import {AppConfigModule} from "./config/app/config.module";
import {DatabaseConfigModule} from "./config/database/config.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [Product],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Product]),
    ProductsModule,
    DatabaseConfigModule,
    AppConfigModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
