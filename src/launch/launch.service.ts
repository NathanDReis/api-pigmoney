import { Injectable } from '@nestjs/common';
import { CreateLaunchDto } from './dto/create-launch.dto';
import { UpdateLaunchDto } from './dto/update-launch.dto';

@Injectable()
export class LaunchService {
  create(createLaunchDto: CreateLaunchDto) {
    return 'This action adds a new launch';
  }

  findAll() {
    return `This action returns all launch`;
  }

  findOne(id: number) {
    return `This action returns a #${id} launch`;
  }

  update(id: number, updateLaunchDto: UpdateLaunchDto) {
    return `This action updates a #${id} launch`;
  }

  remove(id: number) {
    return `This action removes a #${id} launch`;
  }
}
