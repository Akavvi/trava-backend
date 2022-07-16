import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TripsService } from './trips.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { FindTripDto } from './dto/find-trip.dto';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesEnums } from '../../common/enums/roles.enums';

@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Roles(RolesEnums.ADMIN)
  @Post()
  create(@Body() createTripDto: CreateTripDto) {
    return this.tripsService.create(createTripDto);
  }

  @Get()
  findAll(@Body() findTripsDto: FindTripDto) {
    return this.tripsService.findAll(findTripsDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tripsService.findOneById(+id);
  }

  @Get(':name')
  findOneByName(@Param('name') name: string) {
    return this.tripsService.findOneByName(name);
  }

  @Roles(RolesEnums.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTripDto: UpdateTripDto) {
    return this.tripsService.update(+id, updateTripDto);
  }

  @Roles(RolesEnums.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tripsService.remove(+id);
  }
}
