import { CreatePerfilDto } from '../dto/create-perfil.dto';
import { UpdatePerfilDto } from '../dto/update-perfil.dto';
import { Perfil } from '../schemas/perfil.schema';

export interface IPerfilRepository {
  create(createUserDto: CreatePerfilDto): Promise<Perfil>;
  findAll(): Promise<Perfil[]>;
  findById(id: string): Promise<Perfil | null>;
  update(id: string, updatePerfilDto: UpdatePerfilDto): Promise<Perfil | null>;
  softDelete(id: string): Promise<Perfil | null>;
  restore(id: string): Promise<Perfil | null>;
  hardDelete(id: string): Promise<boolean>;
}