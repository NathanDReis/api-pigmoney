import { Module } from '@nestjs/common';
import { LaunchService } from './launch.service';
import { LaunchController } from './launch.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Launch, LaunchSchema } from './schemas/launch.schema';
import { LaunchMongoRepository } from './repositories/launch-mongo.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Launch.name,
      schema: LaunchSchema
    }]),
  ],
  controllers: [LaunchController],
  providers: [
    LaunchService,
    {
      provide: 'LAUNCH_REPOSITORY',
      useClass: LaunchMongoRepository, // ← Trocar aqui para migrar
    }
  ],
  exports: [LaunchService],
})
export class LaunchModule {}
