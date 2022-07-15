import { Test, TestingModule } from '@nestjs/testing';
import { CheckpointsController } from './checkpoints.controller';
import { CheckpointsService } from './checkpoints.service';

describe('CheckpointsController', () => {
  let controller: CheckpointsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CheckpointsController],
      providers: [CheckpointsService],
    }).compile();

    controller = module.get<CheckpointsController>(CheckpointsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
