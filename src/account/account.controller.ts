import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorator/current-user.decorator';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { Permissions } from 'src/common/decorator/permissions.decorator';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  create(
    @Body() createAccountDto: CreateAccountDto,
    @CurrentUser('userId') userId: string
  ) {
    createAccountDto.userId = userId;
    return this.accountService.create(createAccountDto);
  }

  @Get()
  findAll(@CurrentUser('userId') userId: string) {
    return this.accountService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
    return this.accountService.update(id, updateAccountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accountService.remove(id);
  }

  @Patch('restore/:id')
  @Permissions('admin')
  restore(@Param('id') id: string) {
    return this.accountService.restore(id);
  }

  @Delete('hardDelete/:id')
  @Permissions('admin')
  hardDelete(@Param('id') id: string) {
    return this.accountService.hardDelete(id);
  }
}
