import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { LaunchModule } from './launch/launch.module';
import { CategoryModule } from './category/category.module';
import { AccountModule } from './account/account.module';
import { PerfilModule } from './perfil/perfil.module';
import { TransferAccountsModule } from './transfer-accounts/transfer-accounts.module';

@Module({
  imports: [
    // Carregar variáveis de ambiente
    ConfigModule.forRoot({
      isGlobal: true, // Disponível em todos os módulos
    }),

    // Conexão com MongoDB usando variável de ambiente
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URL'),
      }),
      inject: [ConfigService],
    }),
 
    UserModule,
    AuthModule,
    LaunchModule,
    CategoryModule,
    AccountModule,
    PerfilModule,
    TransferAccountsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
