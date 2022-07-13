import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { RolesEnums } from '../enums/roles.enums';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private ref: Reflector) {}

  canActivate(
    ctx: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.ref.getAllAndOverride<RolesEnums[]>(ROLES_KEY, [
      ctx.getHandler,
      ctx.getClass(),
    ]);
    if (!roles) return true;
    const { user } = ctx.switchToHttp().getRequest();
    return roles.some((role) => user.roles.includes(role));
  }
}
