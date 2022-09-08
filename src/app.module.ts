import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Product} from "./products/entities/product.entity";
import {AppConfigModule} from "./config/app/config.module";
import {DatabaseConfigModule} from "./config/database/config.module";
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import {User} from "./user/entities/user.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Product, User]),
    ProductsModule,
    DatabaseConfigModule,
    AppConfigModule,
    UserModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
