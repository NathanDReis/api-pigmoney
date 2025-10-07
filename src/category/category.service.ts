import { Inject, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { type ICategoryRepository } from './interfaces/category-repository.interface';
import { Category } from './schemas/category.schema';

@Injectable()
export class CategoryService {
constructor(
    @Inject('CATEGORY_REPOSITORY')
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    return this.categoryRepository.create(createCategoryDto);
  }

  async findAll(userId?: string): Promise<Category[]> {
    return this.categoryRepository.findAll(userId);
  }

  async update(
    id: string, 
    updateCategoryDto: UpdateCategoryDto
  ): Promise<Category | null> {
    return this.categoryRepository.update(id, updateCategoryDto);
  }

  async remove(id: string): Promise<Category | null> {
    return this.categoryRepository.softDelete(id);
  }

  async restore(id: string): Promise<Category | null> {
    return this.categoryRepository.restore(id);
  }

  async hardDelete(id: string): Promise<boolean> {
    return this.categoryRepository.hardDelete(id);
  }
}
