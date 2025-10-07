import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { BaseEntity } from "src/common/schemas/base-entity.schema";
import { User } from "src/user/schemas/user.schema";

export type CategoryDocument = HydratedDocument<Category>;

@Schema({ timestamps: true })
export class Category extends BaseEntity {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    icon: string;

    @Prop({ required: true })
    colorHex: string;

    @Prop({ ref: User.name, required: true })
    userId: Types.ObjectId;

    @Prop({ required: false, default: false })
    global?: boolean;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
