import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { CategoryMongoRepository } from './repositories/category-mongo.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './schemas/category.schema';
import { PerfilModule } from 'src/perfil/perfil.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ 
      name: Category.name, 
      schema: CategorySchema 
    }]),
    PerfilModule,
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
