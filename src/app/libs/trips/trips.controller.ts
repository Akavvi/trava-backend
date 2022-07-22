import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TripsService } from './trips.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { FindTripDto } from './dto/find-trip.dto';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesEnums } from '../../common/enums/roles.enums';
import { FilterTripDto } from './dto/filter-trip.dto';
import { LocalAuthGuard } from 'src/app/common/guards/local-auth.guard';

@Controller('trips')
@UseGuards(LocalAuthGuard)
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Roles(RolesEnums.ADMIN)
  @Post()
  create(@Body() createTripDto: CreateTripDto) {
    return this.tripsService.create(createTripDto);
  }

  @Get()
  findAll(@Body() findTripsDto: FindTripDto) {
    return this.tripsService.findAll({
      limit: findTripsDto.limit,
      offset: findTripsDto.limit,
      name: findTripsDto.name,
    });
  }

  @Get('id/:id')
  findOne(@Param('id') id: string) {
    return this.tripsService.findOneById(+id);
  }

  @Get('name/:name')
  findOneByName(@Param('name') name: string) {
    return this.tripsService.findOneByName(name);
  }

  @Put('/filter')
  findByParams(@Body() filterTripDto: FilterTripDto) {
    return this.tripsService.filter({
      country: filterTripDto.country,
      minPrice: filterTripDto.minPrice,
      maxPrice: filterTripDto.maxPrice,
    });
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
