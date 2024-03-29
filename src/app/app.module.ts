import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './libs/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './libs/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { TripsModule } from './libs/trips/trips.module';
import { CheckpointsModule } from './libs/checkpoints/checkpoints.module';
import { JwtGuard } from './common/guards/jwt-auth.guard';

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
    AuthModule,
    TripsModule,
    CheckpointsModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: JwtGuard }],
})
export class AppModule {}
