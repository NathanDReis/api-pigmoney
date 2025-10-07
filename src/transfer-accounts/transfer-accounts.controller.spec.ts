import { Test, TestingModule } from '@nestjs/testing';
import { TransferAccountsController } from './transfer-accounts.controller';
import { TransferAccountsService } from './transfer-accounts.service';

describe('TransferAccountsController', () => {
  let controller: TransferAccountsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransferAccountsController],
      providers: [TransferAccountsService],
    }).compile();

    controller = module.get<TransferAccountsController>(TransferAccountsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
