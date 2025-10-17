import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { PerfilService } from "src/perfil/perfil.service";
import { UserService } from "src/user/user.service";

const perfilBase = {
    name: 'Administrador',
    permissions: ['admin'],
};

const userBase = {
    email: 'admin@pigmoney.com',
    userName: 'admin',
    password: 'p2i5g',
    telephone: '(31) 982777939',
};

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  constructor(
    private readonly perfilService: PerfilService,
    private readonly userService: UserService,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    let adminPerfil = await this.perfilService.findByName(perfilBase.name);
    if (!adminPerfil) {
        adminPerfil = await this.perfilService.create({
            name: perfilBase.name,
            permissions: perfilBase.permissions,
        });
        console.log("Perfil Criado!")
    }

    const existingUser = await this.userService.findByEmail(userBase.email);
    if (!existingUser) {
        await this.userService.create({
            fullName: perfilBase.name,
            email: userBase.email,
            telephone: userBase.telephone,
            perfilId: adminPerfil._id!.toString(),
            userName: userBase.userName,
            password: userBase.password,
        });
        console.log("Usuário Criado!")
    }
  }
}
