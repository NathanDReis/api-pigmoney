import { Module } from '@nestjs/common';
import { LaunchService } from './launch.service';
import { LaunchController } from './launch.controller';

@Module({
  controllers: [LaunchController],
  providers: [LaunchService],
})
export class LaunchModule {}
