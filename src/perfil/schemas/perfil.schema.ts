import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BaseEntity } from 'src/common/schemas/base-entity.schema';

export type PerfilDocument = HydratedDocument<Perfil>;

@Schema({ timestamps: true })
export class Perfil extends BaseEntity {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    permissions: string[];
}

export const PerfilSchema = SchemaFactory.createForClass(Perfil);
