import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './libs/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { RolesService } from './libs/roles/roles.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: 'pet-sdi',
      autoLoadEntities: true,
      synchronize: process.env.PRODUCTION == 'true',
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, RolesService],
})
export class AppModule {}
