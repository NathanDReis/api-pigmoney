import { Injectable } from "@nestjs/common";
import { ICategoryRepository } from "../interfaces/category-repository.interface";
import { CreateCategoryDto } from "../dto/create-category.dto";
import { UpdateCategoryDto } from "../dto/update-category.dto";
import { Category, CategoryDocument } from "../schemas/category.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class CategoryMongoRepository implements ICategoryRepository {
    constructor(
        @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
    ) {}

    async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
        const category = new this.categoryModel(createCategoryDto);
        return category.save();
    }

    async findAll(userId?: string): Promise<Category[]> {
        const filter: any = { isDeleted: false };

        if (userId) {
            filter.$or = [{ userId }, { global: true }];
        } else {
            filter.global = true;
        }

        return this.categoryModel
        .find(filter)
        .select('-userId -global')
        .exec();
    }

    async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category | null> {
        return this.categoryModel
            .findByIdAndUpdate(id, updateCategoryDto, { new: true })
            .exec();
    }

    async softDelete(id: string): Promise<Category | null> {
        return this.categoryModel
            .findByIdAndUpdate(
                id,
                { isDeleted: true, deletedAt: new Date() },
                { new: true },
            )
            .exec();
    }

    async restore(id: string): Promise<Category | null> {
        return this.categoryModel
            .findByIdAndUpdate(
                id, 
                { isDeleted: false, deletedAt: null },
                { new: true },
            )
            .exec();
    }

    async hardDelete(id: string): Promise<boolean> {
        const result = await this.categoryModel
            .findByIdAndDelete(id)
            .exec();
        return !!result;
    }
}