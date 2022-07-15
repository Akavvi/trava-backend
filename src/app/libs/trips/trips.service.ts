import { Injectable } from '@nestjs/common';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TripEntity } from './entities/trip.entity';
import { Repository } from 'typeorm';
import { RolesEnums } from '../../common/enums/roles.enums';
import { Roles } from '../../common/decorators/roles.decorator';

@Injectable()
export class TripsService {
  constructor(
    @InjectRepository(TripEntity)
    private readonly trips: Repository<TripEntity>,
  ) {}
  async create(createTripDto: CreateTripDto): Promise<TripEntity | null> {
    const trip = this.trips.create({
      name: createTripDto.name,
      description: createTripDto.description,
      price: createTripDto.price,
      time: createTripDto.time,
    });
    return await this.trips.save(trip);
  }

  @Roles(RolesEnums.CLIENT)
  findAll() {
    return this.trips.find();
  }

  async findOneById(id: number) {
    return await this.trips.findOne({ where: { id: id } });
  }

  async findOneByName(name: string) {
    return await this.trips.findOne({ where: { name: name } });
  }

  async update(id: number, updateTripDto: UpdateTripDto) {
    await this.trips.update(id, updateTripDto);
    return await this.trips.findOne({ where: { id: id } });
  }

  remove(id: number) {
    return this.trips.delete(id);
  }
}
