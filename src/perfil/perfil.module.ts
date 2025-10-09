import { Module } from '@nestjs/common';
import { PerfilService } from './perfil.service';
import { PerfilController } from './perfil.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Perfil, PerfilSchema } from './schemas/perfil.schema';
import { PerfilMongoRepository } from './repositories/perfil-mongo.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Perfil.name,
      schema: PerfilSchema
    }]),
  ],
  controllers: [PerfilController],
  providers: [
    PerfilService,
    {
      provide: 'PERFIL_REPOSITORY',
      useClass: PerfilMongoRepository, // ← Trocar aqui para migrar
    }
  ],
  exports: [PerfilService],
})
export class PerfilModule {}
