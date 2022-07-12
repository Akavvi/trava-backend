import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private users: Repository<UserEntity>,
  ) {}
  create(createUserDto: CreateUserDto): UserEntity {
    return this.users.create({
      name: createUserDto.name,
      surname: createUserDto.surname,
      password: createUserDto.password,
      email: createUserDto.email,
    });
  }

  findAll() {
    return this.users.find();
  }

  findOne(id: number) {
    return this.users.findOne({ where: { id: id } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.users.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.users.delete(id);
  }
}
