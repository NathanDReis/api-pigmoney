import { Module } from '@nestjs/common';
import { TransferAccountsService } from './transfer-accounts.service';
import { TransferAccountsController } from './transfer-accounts.controller';

@Module({
  controllers: [TransferAccountsController],
  providers: [TransferAccountsService],
})
export class TransferAccountsModule {}
