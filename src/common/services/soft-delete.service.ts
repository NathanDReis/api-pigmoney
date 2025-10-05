import { Model, FilterQuery } from 'mongoose';

export abstract class SoftDeleteService<T> {
  constructor(protected readonly model: Model<T>) {}

  async findAll(filter: FilterQuery<T> = {}): Promise<T[]> {
    return this.model.find({ ...filter, isDeleted: false });
  }

  async findById(id: string): Promise<T | null> {
    return this.model.findOne({ _id: id, isDeleted: false } as FilterQuery<T>);
  }

  async softDelete(id: string, userId?: string): Promise<T | null> {
    const updateData: any = {
      isDeleted: true,
      deletedAt: new Date(),
    };
    
    if (userId) {
      updateData.deletedBy = userId;
    }

    return this.model.findByIdAndUpdate(id, updateData, { new: true });
  }

  async restore(id: string): Promise<T | null> {
    return this.model.findByIdAndUpdate(
      id,
      {
        isDeleted: false,
        deletedAt: null,
        deletedBy: null,
      },
      { new: true },
    );
  }

  async hardDelete(id: string): Promise<T | null> {
    return this.model.findByIdAndDelete(id);
  }

  async findWithDeleted(filter: FilterQuery<T> = {}): Promise<T[]> {
    return this.model.find(filter);
  }

  async findDeleted(filter: FilterQuery<T> = {}): Promise<T[]> {
    return this.model.find({ ...filter, isDeleted: true });
  }
}