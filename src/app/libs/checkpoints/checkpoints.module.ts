import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TripsModule } from '../trips/trips.module';
import { CheckpointsService } from './checkpoints.service';
import { CheckpointEntity } from './entities/checkpoint.entity';

@Module({
  providers: [CheckpointsService],
  exports: [CheckpointsService],
  imports: [TripsModule, TypeOrmModule.forFeature([CheckpointEntity])],
})
export class CheckpointsModule {}
