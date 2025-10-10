import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  UseGuards, 
} from '@nestjs/common';
import { TransferAccountsService } from './transfer-accounts.service';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { UpdateTransferDto } from './dto/update-transfer.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorator/current-user.decorator';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { Permissions } from 'src/common/decorator/permissions.decorator';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('transfer-accounts')
export class TransferAccountsController {
  constructor(private readonly transferAccountsService: TransferAccountsService) {}

  @Post()
  create(
    @Body() createTransferDto: CreateTransferDto,
    @CurrentUser('userId') userId: string
  ) {
    createTransferDto.userId = userId;
    return this.transferAccountsService.create(createTransferDto);
  }

  @Get()
  findAll(@CurrentUser('userId') userId: string) {
    return this.transferAccountsService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transferAccountsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTransferDto: UpdateTransferDto) {
    return this.transferAccountsService.update(id, updateTransferDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transferAccountsService.remove(id);
  }

  @Patch('restore/:id')
  @Permissions('admin')
  restore(@Param('id') id: string) {
    return this.transferAccountsService.restore(id);
  }

  @Delete('hardDelete/:id')
  @Permissions('admin')
  hardDelete(@Param('id') id: string) {
    return this.transferAccountsService.hardDelete(id);
  }
}
