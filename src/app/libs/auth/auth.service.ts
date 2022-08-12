import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../users/entities/user.entity';
import { IJwtPayload } from 'src/app/common/interfaces/IJwtPayload';
import { LoginUserDto } from './dto/login-user.dto';
import { SignUpUserDto } from './dto/signUp-user.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly users: UsersService,
    private readonly jwt: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.users.findOneByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async signUp(signUpUserDto: SignUpUserDto) {
    return await this.users.create(signUpUserDto as CreateUserDto);
  }

  async generateJwt(user: Partial<UserEntity>) {
    const payload: IJwtPayload = { sub: user.id, role: user.role };
    return {
      access_token: this.jwt.sign(payload),
    };
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const isValid = await this.validateUser(email, password);
    if (!isValid) throw new UnauthorizedException('Invalid credentials');
    const accessToken = this.generateJwt(isValid);
    return { access_token: accessToken };
  }

  async validatePayload(payload: IJwtPayload) {
    const user = await this.users.findOneById(payload.sub);
    if (!user) return null;
    return user;
  }
}
