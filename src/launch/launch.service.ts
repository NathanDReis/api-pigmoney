import { Inject, Injectable } from '@nestjs/common';
import { CreateLaunchDto } from './dto/create-launch.dto';
import { UpdateLaunchDto } from './dto/update-launch.dto';
import { type ILaunchRepository } from './interfaces/lauch-repository.interface';
import { Launch } from './schemas/launch.schema';

@Injectable()
export class LaunchService {
  constructor(
    @Inject('LAUNCH_REPOSITORY')
    private readonly launchRepository: ILaunchRepository,
  ) {}

  async create(createLaunchDto: CreateLaunchDto) {
    return this.launchRepository.create(createLaunchDto);
  }

  async findAll(userId: string): Promise<Launch[]> {
    return this.launchRepository.findAll(userId);
  }

  async findOne(id: string): Promise<Launch | null> {
    return this.launchRepository.findById(id);
  }

  async update(
    id: string, 
    updateLaunchDto: UpdateLaunchDto
  ): Promise<Launch | null> {
    return this.launchRepository.update(id, updateLaunchDto);
  }

  async remove(id: string): Promise<Launch | null> {
    return this.launchRepository.softDelete(id);
  }

  async restore(id: string): Promise<Launch | null> {
    return this.launchRepository.restore(id);
  }

  async hardDelete(id: string): Promise<boolean> {
    return this.launchRepository.hardDelete(id);
  }
}
