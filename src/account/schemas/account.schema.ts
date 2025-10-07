import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { BaseEntity } from 'src/common/schemas/base-entity.schema';
import { User } from 'src/user/schemas/user.schema';

export enum AccountType {
    WALLET = 'wallet',             // Carteira física
    BANK_ACCOUNT = 'bank_account', // Conta bancária
    CREDIT_CARD = 'credit_card',   // Cartão de crédito
    INVESTMENT = 'investment'      // Investimentos
}

export type AccountDocument = HydratedDocument<Account>;

@Schema({ timestamps: true })
export class Account extends BaseEntity {
    @Prop({ ref: User.name, required: true })
    userId: Types.ObjectId;

    @Prop({ required: true })
    name: string; // Ex: "Carteira", "Nubank", "Itaú"

    @Prop({ 
        type: String,
        enum: AccountType,
        required: true 
    })
    type: AccountType;

    @Prop({ required: true, default: 0 })
    balance: number; // Saldo atual

    @Prop({ required: false })
    bankName?: string; // Nome do banco (opcional)

    @Prop({ required: false })
    icon?: string;

    @Prop({ required: false })
    colorHex?: string;

    @Prop({ default: true })
    isActive: boolean;
}

export const AccountSchema = SchemaFactory.createForClass(Account);