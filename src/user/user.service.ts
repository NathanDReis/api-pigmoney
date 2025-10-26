import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import type { IUserRepository } from './interfaces/user-repository.interface';
import * as bcrypt from 'bcrypt';
import { User } from './schemas/user.schema';
import { PerfilService } from 'src/perfil/perfil.service';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: IUserRepository,
    private readonly perfilService: PerfilService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const exist = await this.findByEmail(createUserDto.email);
    if (exist) {
      throw new Error("Este usuário já existe");
    }

    const commonPerfil = await this.perfilService.findByName("Comum");
    if (!commonPerfil) {
      throw new Error("Não foi possível criar seu usuário no momento. Tente novamente mais tarde");
    }
    createUserDto.perfilId = commonPerfil._id?.toString();

    const salt = await bcrypt.genSalt();
    createUserDto.password = await bcrypt.hash(createUserDto.password, salt);
    return this.userRepository.create(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async findOne(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email)
  }

  async update(
    id: string, 
    updateUserDto: UpdateUserDto
  ): Promise<User | null> {
    return this.userRepository.update(id, updateUserDto);
  }

  async remove(id: string): Promise<User | null> {
    return this.userRepository.softDelete(id);
  }

  async restore(id: string): Promise<User | null> {
    return this.userRepository.restore(id);
  }

  async hardDelete(id: string): Promise<boolean> {
    return this.userRepository.hardDelete(id);
  }
}