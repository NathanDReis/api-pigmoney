import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { LaunchService } from './launch.service';
import { CreateLaunchDto } from './dto/create-launch.dto';
import { UpdateLaunchDto } from './dto/update-launch.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorator/current-user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('launch')
export class LaunchController {
  constructor(private readonly launchService: LaunchService) {}

  @Post()
  create(
    @Body() createLaunchDto: CreateLaunchDto,
    @CurrentUser('userId') userId: string
  ) {
    createLaunchDto.userId = userId;
    return this.launchService.create(createLaunchDto);
  }

  @Get()
  findAll(@CurrentUser('userId') userId: string) {
    return this.launchService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.launchService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLaunchDto: UpdateLaunchDto) {
    return this.launchService.update(id, updateLaunchDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.launchService.remove(id);
  }

  @Patch('restore/:id')
  restore(@Param('id') id: string) {
    return this.launchService.restore(id);
  }

  @Delete('hardDelete/:id')
  hardDelete(@Param('id') id: string) {
    return this.launchService.hardDelete(id);
  }
}
