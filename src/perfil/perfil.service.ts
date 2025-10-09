import { Inject, Injectable } from '@nestjs/common';
import { CreatePerfilDto } from './dto/create-perfil.dto';
import { UpdatePerfilDto } from './dto/update-perfil.dto';
import { Perfil } from './schemas/perfil.schema';
import { type IPerfilRepository } from './interfaces/perfil-repository.interface';

@Injectable()
export class PerfilService {
  constructor(
    @Inject('PERFIL_REPOSITORY')
    private readonly perfilRepository: IPerfilRepository,
  ) {}

  async create(createPerfilDto: CreatePerfilDto) {
    return this.perfilRepository.create(createPerfilDto);
  }

  async findAll(): Promise<Perfil[]> {
    return this.perfilRepository.findAll();
  }

  async findOne(id: string): Promise<Perfil | null> {
    return this.perfilRepository.findById(id);
  }

  async update(
    id: string, 
    updatePerfilDto: UpdatePerfilDto
  ): Promise<Perfil | null> {
    return this.perfilRepository.update(id, updatePerfilDto);
  }

  async remove(id: string): Promise<Perfil | null> {
    return this.perfilRepository.softDelete(id);
  }

  async restore(id: string): Promise<Perfil | null> {
    return this.perfilRepository.restore(id);
  }

  async hardDelete(id: string): Promise<boolean> {
    return this.perfilRepository.hardDelete(id);
  }
}
