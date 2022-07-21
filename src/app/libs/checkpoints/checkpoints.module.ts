import { Module } from '@nestjs/common';
import { TripsModule } from '../trips/trips.module';
import { CheckpointsService } from './checkpoints.service';

@Module({
  providers: [CheckpointsService],
  imports: [TripsModule],
})
export class CheckpointsModule {}
