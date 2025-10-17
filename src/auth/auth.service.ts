import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { User } from 'src/user/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findByEmail(email);
    if (user && await bcrypt.compare(pass, user.password)) {
      return user;
    }
    return null;
  }

  async login(user: User) { 
    const payload = { 
      email: user.email, 
      sub: user._id,
      perfil: user.perfilId,
    };
    return {
      token: this.jwtService.sign(payload),
      user: {
        fullName: user.fullName,
        userName: user.userName,
        email: user.email,
        telephone: user.telephone,
        perfil: user.perfilId,
      },
    };
  }
}
