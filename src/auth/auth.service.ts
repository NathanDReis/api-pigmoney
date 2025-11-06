import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { User } from 'src/user/schemas/user.schema';
import { PerfilService } from 'src/perfil/perfil.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private perfilService: PerfilService,
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
    const perfil = await this.perfilService.findOne(user.perfilId.toString());
    const permissions = perfil?.permissions ? perfil?.permissions : [];

    const payload = { 
      email: user.email, 
      sub: user._id,
      perfil: user.perfilId,
      password: user.password,
    };
    return {
      token: this.jwtService.sign(payload),
      user: {
        fullName: user.fullName,
        userName: user.userName,
        email: user.email,
        telephone: user.telephone,
        perfil: JSON.stringify(permissions),
      },
    };
  }
}
