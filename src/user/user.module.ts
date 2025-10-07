import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User, UserSchema } from './schemas/user.schema';
import { UserMongoRepository } from './repositories/user-mongo.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ 
      name: User.name, 
      schema: UserSchema 
    }]),
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