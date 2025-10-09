import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Account } from 'src/account/schemas/account.schema';
import { BaseEntity } from 'src/common/schemas/base-entity.schema';
import { User } from 'src/user/schemas/user.schema';

export type TransferDocument = HydratedDocument<Transfer>;

@Schema({ timestamps: true })
export class Transfer extends BaseEntity {
    @Prop({ ref: User.name, required: true })
    userId: Types.ObjectId;

    @Prop({ ref: Account.name, required: true })
    fromAccount: Types.ObjectId;

    @Prop({ ref: Account.name, required: true })
    toAccount: Types.ObjectId;

    @Prop({ required: true })
    amount: number;
}

export const TransferSchema = SchemaFactory.createForClass(Transfer);
