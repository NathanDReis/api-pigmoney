import { Prop, Schema } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class BaseEntity {
  @Prop({ type: Boolean, default: false })
  isDeleted: boolean;
  @Prop({ type: Date, default: null })
  deletedAt?: Date;
  @Prop({ type: Types.ObjectId, ref: 'User', default: null })
  deletedBy?: Types.ObjectId;
  
  _id?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}