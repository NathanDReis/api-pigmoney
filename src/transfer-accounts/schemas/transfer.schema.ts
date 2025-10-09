import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { BaseEntity } from 'src/common/schemas/base-entity.schema';
import { Perfil } from 'src/perfil/schemas/perfil.schema';

export type TransferDocument = HydratedDocument<Transfer>;

@Schema({ timestamps: true })
export class Transfer extends BaseEntity {
    @Prop({ required: true })
    fullName: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    telephone: string;

    @Prop({ ref: Perfil.name, required: true })
    perfilId: Types.ObjectId;

    @Prop({ required: true })
    userName: string;

    @Prop({ required: true, select: false })
    password: string;
}

export const TransferSchema = SchemaFactory.createForClass(Transfer);
