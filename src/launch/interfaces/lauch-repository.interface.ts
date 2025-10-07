import { CreateLaunchDto } from '../dto/create-launch.dto';
import { UpdateLaunchDto } from '../dto/update-launch.dto';
import { Launch } from '../schemas/launch.schema';

export interface ILaunchRepository {
  create(createLaunchDto: CreateLaunchDto): Promise<Launch>;
  findAll(userId: string): Promise<Launch[]>;
  findById(id: string): Promise<Launch | null>;
  update(id: string, updateLaunchDto: UpdateLaunchDto): Promise<Launch | null>;
  softDelete(id: string): Promise<Launch | null>;
  restore(id: string): Promise<Launch | null>;
  hardDelete(id: string): Promise<boolean>;
}