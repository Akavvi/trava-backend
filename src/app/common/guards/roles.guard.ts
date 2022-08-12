import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { RolesEnums } from '../enums/roles.enums';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private ref: Reflector, private jwt: JwtService) {}

  canActivate(
    ctx: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.ref.getAllAndOverride<RolesEnums[]>(ROLES_KEY, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);
    if (!roles) return true;
    const header = (ctx.switchToHttp().getRequest() as Request).headers
      .authorization;
    const user = this.jwt.verify(header.split(' ')[1]);
    return roles.some((role) => user?.role?.includes(role));
  }
}
