import { Module } from '@nestjs/common';
import { TransfersService } from './transfer-accounts.service';
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
    TransfersService,
    {
      provide: '',
      useClass: TransferMongoRepository, // ← Trocar aqui para migrar
    }
  ],
  exports: [TransfersService],
})
export class TransferAccountsModule {}
