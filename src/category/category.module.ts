import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { CategoryMongoRepository } from './repositories/category-mongo.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './schemas/category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ 
      name: Category.name, 
      schema: CategorySchema 
    }]),
  ],
  controllers: [CategoryController],
  providers: [
    CategoryService,
    {
      provide: 'CATEGORY_REPOSITORY',
      useClass: CategoryMongoRepository, // ← Trocar aqui para migrar
    }
  ],
  exports: [CategoryService],
})
export class CategoryModule {}
