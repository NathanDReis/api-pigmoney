import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { BaseEntity } from "src/common/schemas/base-entity.schema";
import { User } from "src/user/schemas/user.schema";

export type CategoryDocument = HydratedDocument<Category>;

@Schema({ timestamps: true })
export class Category extends BaseEntity {
    @Prop({ type: String, required: true })
    name: string;

    @Prop({ type: String, required: true })
    icon: string;

    @Prop({ type: String, required: true })
    colorHex: string;

    @Prop({ 
        type: Types.ObjectId, 
        ref: User.name, 
        required: true,
    })
    userId: Types.ObjectId;

    @Prop({ 
        type: Boolean, 
        required: false, 
        default: false,
    })
    global?: boolean;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
