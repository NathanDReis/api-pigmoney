import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PayloadAuthResult, PayloadAuthToken } from './interfaces/payload-auth.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET!
    });
  }

  validate(payload: PayloadAuthToken): PayloadAuthResult {
    return { 
      userId: payload.sub, 
      email: payload.email,
      perfilId: payload.perfil
    };
  }
}
