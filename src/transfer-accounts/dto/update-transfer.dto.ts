import { PartialType } from '@nestjs/mapped-types';
import { CreateTransferAccountDto } from './create-transfer.dto';

export class UpdateTransferAccountDto extends PartialType(CreateTransferAccountDto) {}
