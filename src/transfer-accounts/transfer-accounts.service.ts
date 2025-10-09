import { Inject, Injectable } from '@nestjs/common';
import { CreateTransferAccountDto } from './dto/create-transfer.dto';
import { UpdateTransferAccountDto } from './dto/update-transfer.dto';
import { type ITransferRepository } from './interfaces/transfer-repository.interface';
import { Transfer } from './schemas/transfer.schema';

@Injectable()
export class TransfersService {
  constructor(
    @Inject('TRANSFER_REPOSITORY')
    private readonly transferRepository: ITransferRepository,
  ) {}

  async create(createTransferDto: CreateTransferAccountDto) {
    return this.transferRepository.create(createTransferDto);
  }

  async findAll(userId: string): Promise<Transfer[]> {
    if (!userId) 
      throw new Error("Usuário sem permissão para ver transferências");
    return this.transferRepository.findAll(userId);
  }

  async update(
    id: string, 
    updateTransferDto: UpdateTransferAccountDto
  ): Promise<Transfer | null> {
    return this.transferRepository.update(id, updateTransferDto);
  }

  async remove(id: string): Promise<Transfer | null> {
    return this.transferRepository.softDelete(id);
  }

  async restore(id: string): Promise<Transfer | null> {
    return this.transferRepository.restore(id);
  }

  async hardDelete(id: string): Promise<boolean> {
    return this.transferRepository.hardDelete(id);
  }
}
