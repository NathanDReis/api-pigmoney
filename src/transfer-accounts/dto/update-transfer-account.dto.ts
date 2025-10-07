import { PartialType } from '@nestjs/mapped-types';
import { CreateTransferAccountDto } from './create-transfer-account.dto';

export class UpdateTransferAccountDto extends PartialType(CreateTransferAccountDto) {}
