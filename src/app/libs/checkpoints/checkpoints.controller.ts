import { Controller } from '@nestjs/common';
import { CheckpointsService } from './checkpoints.service';

@Controller('checkpoints')
export class CheckpointsController {
  constructor(private readonly checkpointsService: CheckpointsService) {}
}
