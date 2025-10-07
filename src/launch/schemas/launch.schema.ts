// src/launch/schemas/launch.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Account } from 'src/account/schemas/account.schema';
import { Category } from 'src/category/schemas/category.schema';
import { BaseEntity } from 'src/common/schemas/base-entity.schema';
import { User } from 'src/user/schemas/user.schema';

export enum LaunchType {
    INCOME = 'income',     // Receita (adiciona)
    EXPENSE = 'expense',   // Despesa (subtrai)
    TRANSFER = 'transfer'  // Transferência entre contas
}

export type LaunchDocument = HydratedDocument<Launch>;

@Schema({ timestamps: true })
export class Launch extends BaseEntity {
    @Prop({ ref: User.name, required: true })
    userId: Types.ObjectId;

    @Prop({ ref: Category.name, required: true })
    categoryId: Types.ObjectId;

    @Prop({ ref: Account.name, required: true })
    accountId: Types.ObjectId;

    @Prop({ required: false })
    description?: string;

    @Prop({ required: true })
    amount: number;

    @Prop({ 
        type: String,
        enum: LaunchType,
        required: true 
    })
    type: LaunchType;
}

export const LaunchSchema = SchemaFactory.createForClass(Launch);