import { CreateAccountDto } from '../dto/create-account.dto';
import { UpdateAccountDto } from '../dto/update-account.dto';
import { Account } from '../schemas/account.schema';

export interface IAccountRepository {
  create(createCategoryDto: CreateAccountDto): Promise<Account>;
  findAll(userId?: string): Promise<Account[]>;
  findById(id: string): Promise<Account | null>;
  update(id: string, updateCategoryDto: UpdateAccountDto): Promise<Account | null>;
  softDelete(id: string): Promise<Account | null>;
  restore(id: string): Promise<Account | null>;
  hardDelete(id: string): Promise<boolean>;
}