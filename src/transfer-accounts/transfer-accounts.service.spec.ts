import { Test, TestingModule } from '@nestjs/testing';
import { TransferAccountsService } from './transfer-accounts.service';

describe('TransferAccountsService', () => {
  let service: TransferAccountsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransferAccountsService],
    }).compile();

    service = module.get<TransferAccountsService>(TransferAccountsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
