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
    private readonly users: Repository<UserEntity>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<UserEntity | null> {
    const userExists = await this.users.findOne({
      where: { email: createUserDto.email },
    });
    if (userExists) return null;
    const user = this.users.create({
      name: createUserDto.name,
      surname: createUserDto.surname,
      password: createUserDto.password,
      email: createUserDto.email,
    });
    return await this.users.save(user);
  }

  findAll(): Promise<UserEntity[]> {
    return this.users.find();
  }

  async findOne(id: number) {
    const user = await this.users.findOne({ where: { id: id } });
    delete user.password;

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.users.update(id, updateUserDto);
    const user = await this.users.findOne({ where: { id: id } });
    delete user.password;

    return user;
  }

  remove(id: number) {
    return this.users.delete(id);
  }
}
