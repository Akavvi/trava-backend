import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { TripsService } from '../trips/trips.service';
import { CreateCheckpointDto } from './dto/create-checkpoint.dto';
import { CheckpointEntity } from './entities/checkpoint.entity';

@Injectable()
export class CheckpointsService {
  constructor(
    @InjectRepository(CheckpointEntity)
    private readonly checkpoints: Repository<CheckpointEntity>,
    private readonly trips: TripsService,
  ) {}

  async create(tripId: number, createCheckpointDto: CreateCheckpointDto) {
    const trip = await this.trips.findOneById(tripId);
    if (!trip) return null;
    return this.checkpoints.create({
      name: createCheckpointDto.name,
      description: createCheckpointDto.description,
      image: createCheckpointDto.imageUrl,
      price: createCheckpointDto.price,
      trip: trip,
    });
  }

  async findByName(name: string) {
    return this.checkpoints.findOne({ where: { name: Like(name) } });
  }
}
