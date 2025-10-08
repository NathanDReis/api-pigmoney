import { Inject, Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { type IAccountRepository } from './interfaces/account-repository.interface';
import { Account } from './schemas/account.schema';

@Injectable()
export class AccountService {
  constructor(
    @Inject('ACCOUNT_REPOSITORY')
    private readonly accountRepository: IAccountRepository,
  ) {}

  create(createAccountDto: CreateAccountDto) {
    return this.accountRepository.create(createAccountDto)
  }

  findAll(userId: string): Promise<Account[]> {
    if (!userId)
      throw new Error("Conta sem permissão para ver");
    return this.accountRepository.findAll(userId);
  }

  findOne(id: string) {
    return this.accountRepository.findById(id);
  }

  update(
    id: string, 
    updateAccountDto: UpdateAccountDto
  ): Promise<Account | null> {
    return this.accountRepository.update(id, updateAccountDto);
  }

  async remove(id: string): Promise<Account | null> {
    return this.accountRepository.softDelete(id);
  }

  async restore(id: string): Promise<Account | null> {
    return this.accountRepository.restore(id);
  }

  async hardDelete(id: string): Promise<boolean> {
    return this.accountRepository.hardDelete(id);
  }
}
