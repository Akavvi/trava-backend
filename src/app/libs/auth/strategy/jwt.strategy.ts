import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IJwtPayload } from 'src/app/common/interfaces/IJwtPayload';
import { AuthService } from '../auth.service';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private auth: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'roflanebalo',
    });
  }

  async validate(payload: IJwtPayload) {
    const user = await this.auth.validatePayload(payload);
    if (!user) throw new UnauthorizedException('Invalid token');
    return user;
  }
}
