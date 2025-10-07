import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { LaunchService } from './launch.service';
import { CreateLaunchDto } from './dto/create-launch.dto';
import { UpdateLaunchDto } from './dto/update-launch.dto';

@Controller('launch')
export class LaunchController {
  constructor(private readonly launchService: LaunchService) {}

  @Post()
  create(@Body() createLaunchDto: CreateLaunchDto) {
    return this.launchService.create(createLaunchDto);
  }

  @Get()
  findAll(@Query('userId') userId: string) {
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
