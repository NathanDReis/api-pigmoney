import { IsBoolean, IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export enum AccountType {
    WALLET = 'wallet',             // Carteira física
    BANK_ACCOUNT = 'bank_account', // Conta bancária
    CREDIT_CARD = 'credit_card',   // Cartão de crédito
    INVESTMENT = 'investment'      // Investimentos
}

export class CreateAccountDto {
    @IsNotEmpty({ message: 'userId é obrigatório' })
    @IsMongoId({ message: 'userId deve ser um ObjectId válido' })
    userId: string;

    @IsNotEmpty({ message: 'Nome é obrigatório' })
    @IsString({ message: 'Nome deve ser uma string' })
    name: string; // Ex: "Carteira", "Nubank", "Itaú"

    @IsNotEmpty({ message: 'Tipo é obrigatório' })
    @IsEnum(AccountType, { message: 'Tipo deve ser válido' })
    type: AccountType;

    @IsNotEmpty({ message: 'Saldo é obrigatório' })
    @IsNumber({}, { message: 'Saldo deve ser um número' })
    balance: number; // Saldo atual

    @IsOptional()
    @IsString({ message: 'Banco deve ser uma string' })
    bankName?: string; // Nome do banco (opcional)

    @IsOptional()
    @IsString({ message: 'Ícone deve ser uma string' })
    icon?: string;

    @IsOptional()
    @IsString({ message: 'Cor HEX deve ser uma string' })
    colorHex?: string;

    @IsOptional()
    @IsBoolean({ message: 'Ativo deve ser um boolean' })
    isActive?: boolean;
}
