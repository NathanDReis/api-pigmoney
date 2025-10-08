import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IAccountRepository } from '../interfaces/account-repository.interface';
import { Account, AccountDocument } from '../schemas/account.schema';
import { CreateAccountDto } from '../dto/create-account.dto';
import { UpdateAccountDto } from '../dto/update-account.dto';

@Injectable()
export class UserMongoRepository implements IAccountRepository {
  constructor(
    @InjectModel(Account.name) private accountModel: Model<AccountDocument>,
  ) {}

  async create(createAccountDto: CreateAccountDto): Promise<Account> {
    const user = new this.accountModel(createAccountDto);
    return user.save();
  }

  async findAll(): Promise<Account[]> {
    return this.accountModel.find({ isDeleted: false }).exec();
  }

  async findById(id: string): Promise<Account | null> {
    return this.accountModel.findOne({ _id: id, isDeleted: false }).exec();
  }

  async update(id: string, updateAccountDto: UpdateAccountDto): Promise<Account | null> {
    return this.accountModel
      .findByIdAndUpdate(id, updateAccountDto, { new: true })
      .exec();
  }

  async softDelete(id: string): Promise<Account | null> {
    return this.accountModel
      .findByIdAndUpdate(
        id,
        { isDeleted: true, deletedAt: new Date() },
        { new: true },
      )
      .exec();
  }

  async restore(id: string): Promise<Account | null> {
    return this.accountModel
      .findByIdAndUpdate(
        id,
        { isDeleted: false, deletedAt: null },
        { new: true },
      )
      .exec();
  }

  async hardDelete(id: string): Promise<boolean> {
    const result = await this.accountModel.findByIdAndDelete(id).exec();
    return !!result;
  }
}