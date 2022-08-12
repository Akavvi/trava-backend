import { RolesEnums } from '../enums/roles.enums';

export interface IJwtPayload {
  sub: number;
  role: RolesEnums;
}
