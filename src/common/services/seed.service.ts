import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { CategoryService } from "src/category/category.service";
import { PerfilService } from "src/perfil/perfil.service";
import { UserService } from "src/user/user.service";

const perfilBase = {
  admin: {
    name: 'Administrador',
    permissions: ['admin'],
  },
  common: {
    name: 'Comum',
    permissions: [],
  },
};

const userBase = {
  email: 'admin@pigmoney.com',
  userName: 'admin',
  password: 'Teste@2025',
  telephone: '(31) 982777939',
};

const categories = [
  {
    name: "Alimentação",
    icon: "coffee",
    colorHex: "#FF6B6B",
    global: true
  },
  {
    name: "Transporte",
    icon: "truck",
    colorHex: "#4ECDC4",
    global: true
  },
  {
    name: "Moradia",
    icon: "home",
    colorHex: "#45B7D1",
    global: true
  },
  {
    name: "Saúde",
    icon: "heart",
    colorHex: "#96CEB4",
    global: true
  },
  {
    name: "Educação",
    icon: "book",
    colorHex: "#FFEAA7",
    global: true
  },
  {
    name: "Lazer",
    icon: "smile",
    colorHex: "#DFE6E9",
    global: true
  },
  {
    name: "Compras",
    icon: "shopping-bag",
    colorHex: "#A29BFE",
    global: true
  },
  {
    name: "Vestuário",
    icon: "shopping-cart",
    colorHex: "#FD79A8",
    global: true
  },
  {
    name: "Contas e Serviços",
    icon: "file-text",
    colorHex: "#636E72",
    global: true
  },
  {
    name: "Telefone e Internet",
    icon: "smartphone",
    colorHex: "#00B894",
    global: true
  },
  {
    name: "Combustível",
    icon: "target",
    colorHex: "#FDCB6E",
    global: true
  },
  {
    name: "Pets",
    icon: "gitlab",
    colorHex: "#E17055",
    global: true
  },
  {
    name: "Academia",
    icon: "activity",
    colorHex: "#00CEC9",
    global: true
  },
  {
    name: "Investimentos",
    icon: "trending-up",
    colorHex: "#6C5CE7",
    global: true
  },
  {
    name: "Viagens",
    icon: "map",
    colorHex: "#74B9FF",
    global: true
  },
  {
    name: "Assinaturas",
    icon: "refresh-cw",
    colorHex: "#A29BFE",
    global: true
  },
  {
    name: "Empréstimos",
    icon: "alert-circle",
    colorHex: "#FF7675",
    global: true
  },
  {
    name: "Impostos",
    icon: "file-minus",
    colorHex: "#2D3436",
    global: true
  },
  {
    name: "Seguros",
    icon: "shield",
    colorHex: "#0984E3",
    global: true
  },
  {
    name: "Presentes",
    icon: "gift",
    colorHex: "#FD79A8",
    global: true
  },
  {
    name: "Doações",
    icon: "heart",
    colorHex: "#FF6B9D",
    global: true
  },
  {
    name: "Beleza e Cuidados",
    icon: "feather",
    colorHex: "#FAB1A0",
    global: true
  },
  // Categorias de Receitas
  {
    name: "Salário",
    icon: "dollar-sign",
    colorHex: "#00B894",
    global: true
  },
  {
    name: "Freelance",
    icon: "briefcase",
    colorHex: "#55EFC4",
    global: true
  },
  {
    name: "Investimentos",
    icon: "trending-up",
    colorHex: "#6C5CE7",
    global: true
  },
  {
    name: "Vendas",
    icon: "tag",
    colorHex: "#FDCB6E",
    global: true
  },
  {
    name: "Prêmios",
    icon: "award",
    colorHex: "#FFD700",
    global: true
  },
  {
    name: "Reembolsos",
    icon: "rotate-ccw",
    colorHex: "#74B9FF",
    global: true
  },
  {
    name: "Outros",
    icon: "more-horizontal",
    colorHex: "#B2BEC3",
    global: true
  }
];

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  constructor(
    private readonly perfilService: PerfilService,
    private readonly userService: UserService,
    private readonly categoryService: CategoryService,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    // Criar perfis
    let adminPerfil = await this.perfilService.findByName(perfilBase.admin.name);
    if (!adminPerfil) {
        adminPerfil = await this.perfilService.create({
            name: perfilBase.admin.name,
            permissions: perfilBase.admin.permissions,
        });
    }

    // Criar usuário admin
    const existingUser = await this.userService.findByEmail(userBase.email);
    if (!existingUser) {
        await this.userService.create({
            fullName: perfilBase.admin.name,
            email: userBase.email,
            telephone: userBase.telephone,
            perfilId: adminPerfil._id!.toString(),
            userName: userBase.userName,
            password: userBase.password,
        });
    }

    // Criar perfil comum
    let commonPerfil = await this.perfilService.findByName(perfilBase.common.name);
    if (!commonPerfil) {
        commonPerfil = await this.perfilService.create({
            name: perfilBase.common.name,
            permissions: perfilBase.common.permissions,
        });
    }

    // Criar categorias globais com userId do admin
    for (const category of categories) {
      const categoryExist = await this.categoryService.findByName(category.name);
      if (!categoryExist) {
        await this.categoryService.create({
          ...category,
          userId: existingUser!._id!.toString(),
        });
      }
    }

    console.log('✅ Seed completed successfully');
  }
}