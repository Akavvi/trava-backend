import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { Public } from 'src/app/common/decorators/public.decorator';
import { Roles } from 'src/app/common/decorators/roles.decorator';
import { RolesEnums } from 'src/app/common/enums/roles.enums';
import { RolesGuard } from 'src/app/common/guards/roles.guard';
import { LocalAuthGuard } from '../../common/guards/local-auth.guard';
import { AuthService } from './auth.service';
import { SignUpUserDto } from './dto/signUp-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}
  @Post('/login')
  @Public()
  @UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    return this.auth.generateJwt(req.user);
  }

  @Post('/signup')
  @Public()
  async signUp(@Body() signUpUserDto: SignUpUserDto) {
    return this.auth.signUp(signUpUserDto);
  }
}
