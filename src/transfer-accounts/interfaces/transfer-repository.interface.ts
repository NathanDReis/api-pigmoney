import { CreateTransferAccountDto } from '../dto/create-transfer.dto';
import { UpdateTransferAccountDto } from '../dto/update-transfer.dto';
import { Transfer } from '../schemas/transfer.schema';

export interface ITransferRepository {
  create(createTransferDto: CreateTransferAccountDto): Promise<Transfer>;
  findAll(userId: string): Promise<Transfer[]>;
  findById(id: string): Promise<Transfer | null>;
  findByEmail(email: string): Promise<Transfer | null>;
  update(id: string, updateTransferDto: UpdateTransferAccountDto): Promise<Transfer | null>;
  softDelete(id: string): Promise<Transfer | null>;
  restore(id: string): Promise<Transfer | null>;
  hardDelete(id: string): Promise<boolean>;
}