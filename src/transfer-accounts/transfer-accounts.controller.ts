import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { TransferAccountsService } from './transfer-accounts.service';
import { CreateTransferAccountDto } from './dto/create-transfer.dto';
import { UpdateTransferAccountDto } from './dto/update-transfer.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('transfer-accounts')
export class TransferAccountsController {
  constructor(private readonly transferAccountsService: TransferAccountsService) {}


  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createTransferDto: CreateTransferAccountDto) {
    return this.transferAccountsService.create(createTransferDto);
  }

  @Get()
  findAll(@Query('userId') userId: string) {
    return this.transferAccountsService.findAll(userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTransferDto: UpdateTransferAccountDto) {
    return this.transferAccountsService.update(id, updateTransferDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transferAccountsService.remove(id);
  }

  @Patch('restore/:id')
  restore(@Param('id') id: string) {
    return this.transferAccountsService.restore(id);
  }

  @Delete('hardDelete/:id')
  hardDelete(@Param('id') id: string) {
    return this.transferAccountsService.hardDelete(id);
  }
}
