import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthResult, AuthToken } from './interfaces/payload-auth.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET!
    });
  }

  validate(payload: AuthToken): AuthResult {
    return { 
      userId: payload.sub, 
      email: payload.email,
      perfilId: payload.perfil
    };
  }
}
