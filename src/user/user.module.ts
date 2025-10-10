import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User, UserSchema } from './schemas/user.schema';
import { UserMongoRepository } from './repositories/user-mongo.repository';
import { PerfilModule } from 'src/perfil/perfil.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ 
      name: User.name, 
      schema: UserSchema 
    }]),
    PerfilModule,
  ],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'USER_REPOSITORY',
      useClass: UserMongoRepository, // ← Trocar aqui para migrar
    },
  ],
  exports: [UserService],
})
export class UserModule {}