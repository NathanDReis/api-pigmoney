import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Account, AccountSchema } from './schemas/account.schema';
import { AccountMongoRepository } from './repositories/account-mongo.repository';
import { PerfilModule } from 'src/perfil/perfil.module';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Account.name,
      schema: AccountSchema
    }]),
    PerfilModule,
  ],
  controllers: [AccountController],
  providers: [
    AccountService,
    {
      provide: 'ACCOUNT_REPOSITORY',
      useClass: AccountMongoRepository, // ← Trocar aqui para migrar
    }
  ],
  exports: [AccountService],
})
export class AccountModule {}
