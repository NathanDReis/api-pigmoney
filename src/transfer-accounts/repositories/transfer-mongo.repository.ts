import { Injectable, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transfer, TransferDocument } from '../schemas/transfer.schema';
import { CreateTransferDto } from '../dto/create-transfer.dto';
import { UpdateTransferDto } from '../dto/update-transfer.dto';
import { ITransferRepository } from '../interfaces/transfer-repository.interface';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Injectable()
export class TransferMongoRepository implements ITransferRepository {
  constructor(
    @InjectModel(Transfer.name) private transferModel: Model<TransferDocument>,
  ) {}

  async create(createTransferDto: CreateTransferDto): Promise<Transfer> {
    const transfer = new this.transferModel(createTransferDto);
    return transfer.save();
  }

  async findAll(): Promise<Transfer[]> {
    return this.transferModel.find({ isDeleted: false }).exec();
  }

  async findById(id: string): Promise<Transfer | null> {
    return this.transferModel.findOne({ _id: id, isDeleted: false }).exec();
  }

  async findByEmail(email: string): Promise<Transfer | null> {
    return this.transferModel.findOne({ email, isDeleted: false })
      .select('+password').exec();
  }

  async update(id: string, updateTransferDto: UpdateTransferDto): Promise<Transfer | null> {
    return this.transferModel
      .findByIdAndUpdate(id, updateTransferDto, { new: true })
      .exec();
  }

  async softDelete(id: string): Promise<Transfer | null> {
    return this.transferModel
      .findByIdAndUpdate(
        id,
        { isDeleted: true, deletedAt: new Date() },
        { new: true },
      )
      .exec();
  }

  async restore(id: string): Promise<Transfer | null> {
    return this.transferModel
      .findByIdAndUpdate(
        id,
        { isDeleted: false, deletedAt: null },
        { new: true },
      )
      .exec();
  }

  async hardDelete(id: string): Promise<boolean> {
    const result = await this.transferModel.findByIdAndDelete(id).exec();
    return !!result;
  }
}