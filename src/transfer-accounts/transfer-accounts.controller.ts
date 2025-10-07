import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TransferAccountsService } from './transfer-accounts.service';
import { CreateTransferAccountDto } from './dto/create-transfer-account.dto';
import { UpdateTransferAccountDto } from './dto/update-transfer-account.dto';

@Controller('transfer-accounts')
export class TransferAccountsController {
  constructor(private readonly transferAccountsService: TransferAccountsService) {}

  @Post()
  create(@Body() createTransferAccountDto: CreateTransferAccountDto) {
    return this.transferAccountsService.create(createTransferAccountDto);
  }

  @Get()
  findAll() {
    return this.transferAccountsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transferAccountsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTransferAccountDto: UpdateTransferAccountDto) {
    return this.transferAccountsService.update(+id, updateTransferAccountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transferAccountsService.remove(+id);
  }
}
