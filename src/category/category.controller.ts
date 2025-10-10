import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorator/current-user.decorator';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { Permissions } from 'src/common/decorator/permissions.decorator';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Body() createCategoryDto: CreateCategoryDto,
    @CurrentUser('userId') userId: string
  ) {
    createCategoryDto.userId = userId;
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  findAll(@Query('userId') userId?: string) {
    return this.categoryService.findAll(userId);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }

  @Patch('restore/:id')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('admin')
  restore(@Param('id') id: string) {
    return this.categoryService.restore(id);
  }

  @Delete('hardDelete/:id')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('admin')
  hardDelete(@Param('id') id: string) {
    return this.categoryService.hardDelete(id);
  }
}
