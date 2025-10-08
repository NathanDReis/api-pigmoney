import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { Category } from '../schemas/category.schema';

export interface ICategoryRepository {
  create(createCategoryDto: CreateCategoryDto): Promise<Category>;
  findAll(userId?: string): Promise<Category[]>;
  update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category | null>;
  softDelete(id: string): Promise<Category | null>;
  restore(id: string): Promise<Category | null>;
  hardDelete(id: string): Promise<boolean>;
}