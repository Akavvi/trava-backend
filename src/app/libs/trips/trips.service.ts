import { Injectable } from '@nestjs/common';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TripEntity } from './entities/trip.entity';
import { Between, Like, Repository } from 'typeorm';
import { RolesEnums } from '../../common/enums/roles.enums';
import { Roles } from '../../common/decorators/roles.decorator';
import { ITripSearchParams } from './interfaces/ITripSearchParams';
import { ITripFilterParams } from './interfaces/ITripFilterParams';

@Injectable()
export class TripsService {
  constructor(
    @InjectRepository(TripEntity)
    private readonly trips: Repository<TripEntity>,
  ) {}

  @Roles(RolesEnums.ADMIN)
  async create(createTripDto: CreateTripDto): Promise<TripEntity | null> {
    const trip = this.trips.create({
      name: createTripDto.name,
      description: createTripDto.description,
      country: createTripDto.country,
      price: createTripDto.price,
      time: createTripDto.time,
      checkpoints: createTripDto.checkpoints,
    });
    return await this.trips.save(trip);
  }

  findAll({ limit = 0, offset = 0, name }: ITripSearchParams) {
    return this.trips.find({
      take: limit,
      skip: offset,
      where: { name: Like(name) },
    });
  }

  async findOneById(id: number) {
    return await this.trips.findOne({ where: { id: id } });
  }

  async findOneByName(name: string) {
    return await this.trips.findOne({ where: { name: Like(name) } });
  }

  async filter({ country, minPrice = 1, maxPrice }: ITripFilterParams) {
    return await this.trips.find({
      where: {
        price: Between(minPrice, maxPrice),
        country: country,
      },
    });
  }

  async update(id: number, updateTripDto: UpdateTripDto) {
    await this.trips.update(id, updateTripDto);
    return await this.trips.findOne({ where: { id: id } });
  }

  remove(id: number) {
    return this.trips.delete(id);
  }
}
