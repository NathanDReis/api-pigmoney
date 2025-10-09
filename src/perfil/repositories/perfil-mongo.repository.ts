import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Perfil, PerfilDocument } from '../schemas/perfil.schema';
import { CreatePerfilDto } from '../dto/create-perfil.dto';
import { UpdatePerfilDto } from '../dto/update-perfil.dto';
import { IPerfilRepository } from '../interfaces/perfil-repository.interface';

@Injectable()
export class PerfilMongoRepository implements IPerfilRepository {
  constructor(
    @InjectModel(Perfil.name) private perfilModel: Model<PerfilDocument>,
  ) {}

  async create(createPerfilDto: CreatePerfilDto): Promise<Perfil> {
    const perfil = new this.perfilModel(createPerfilDto);
    return perfil.save();
  }

  async findAll(): Promise<Perfil[]> {
    return this.perfilModel.find({ isDeleted: false }).exec();
  }

  async findById(id: string): Promise<Perfil | null> {
    return this.perfilModel.findOne({ _id: id, isDeleted: false }).exec();
  }

  async update(id: string, updatePerfilDto: UpdatePerfilDto): Promise<Perfil | null> {
    return this.perfilModel
      .findByIdAndUpdate(id, updatePerfilDto, { new: true })
      .exec();
  }

  async softDelete(id: string): Promise<Perfil | null> {
    return this.perfilModel
      .findByIdAndUpdate(
        id,
        { isDeleted: true, deletedAt: new Date() },
        { new: true },
      )
      .exec();
  }

  async restore(id: string): Promise<Perfil | null> {
    return this.perfilModel
      .findByIdAndUpdate(
        id,
        { isDeleted: false, deletedAt: null },
        { new: true },
      )
      .exec();
  }

  async hardDelete(id: string): Promise<boolean> {
    const result = await this.perfilModel.findByIdAndDelete(id).exec();
    return !!result;
  }
}