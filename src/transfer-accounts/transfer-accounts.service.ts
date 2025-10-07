import { Injectable } from '@nestjs/common';
import { CreateTransferAccountDto } from './dto/create-transfer-account.dto';
import { UpdateTransferAccountDto } from './dto/update-transfer-account.dto';

@Injectable()
export class TransferAccountsService {
  create(createTransferAccountDto: CreateTransferAccountDto) {
    return 'This action adds a new transferAccount';
  }

  findAll() {
    return `This action returns all transferAccounts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transferAccount`;
  }

  update(id: number, updateTransferAccountDto: UpdateTransferAccountDto) {
    return `This action updates a #${id} transferAccount`;
  }

  remove(id: number) {
    return `This action removes a #${id} transferAccount`;
  }
}
