import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ILaunchRepository } from '../interfaces/lauch-repository.interface';
import { Launch, LaunchDocument } from '../schemas/launch.schema';
import { CreateLaunchDto } from '../dto/create-launch.dto';
import { UpdateLaunchDto } from '../dto/update-launch.dto';

@Injectable()
export class LaunchMongoRepository implements ILaunchRepository {
  constructor(
    @InjectModel(Launch.name) private launchModel: Model<LaunchDocument>,
  ) {}

  async create(createLaunchDto: CreateLaunchDto): Promise<Launch> {
    const launch = new this.launchModel(createLaunchDto);
    return launch.save();
  }

  async findAll(userId: string): Promise<Launch[]> {
    return this.launchModel.find({ 
      isDeleted: false,  
      userId,
    }).exec();
  }

  async findById(id: string): Promise<Launch | null> {
    return this.launchModel.findOne({ _id: id, isDeleted: false }).exec();
  }

  async update(id: string, updateLaunchDto: UpdateLaunchDto): Promise<Launch | null> {
    return this.launchModel
      .findByIdAndUpdate(id, updateLaunchDto, { new: true })
      .exec();
  }

  async softDelete(id: string): Promise<Launch | null> {
    return this.launchModel
      .findByIdAndUpdate(
        id,
        { isDeleted: true, deletedAt: new Date() },
        { new: true },
      )
      .exec();
  }

  async restore(id: string): Promise<Launch | null> {
    return this.launchModel
      .findByIdAndUpdate(
        id,
        { isDeleted: false, deletedAt: null },
        { new: true },
      )
      .exec();
  }

  async hardDelete(id: string): Promise<boolean> {
    const result = await this.launchModel.findByIdAndDelete(id).exec();
    return !!result;
  }
}