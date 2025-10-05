import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../schemas/user.schema';

export interface IUserRepository {
  create(createUserDto: CreateUserDto): Promise<User>;
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  update(id: string, updateUserDto: UpdateUserDto): Promise<User | null>;
  softDelete(id: string): Promise<User | null>;
  restore(id: string): Promise<User | null>;
  hardDelete(id: string): Promise<boolean>;
}