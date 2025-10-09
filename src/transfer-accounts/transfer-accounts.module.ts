import { Module } from '@nestjs/common';
import { TransferAccountsService } from './transfer-accounts.service';
import { TransferAccountsController } from './transfer-accounts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Transfer, TransferSchema } from './schemas/transfer.schema';
import { TransferMongoRepository } from './repositories/transfer-mongo.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Transfer.name,
      schema: TransferSchema,
    }]),
  ],
  controllers: [TransferAccountsController],
  providers: [
    TransferAccountsService,
    {
      provide: 'TRANSFER_REPOSITORY',
      useClass: TransferMongoRepository, // ← Trocar aqui para migrar
    }
  ],
  exports: [TransferAccountsService],
})
export class TransferAccountsModule {}
