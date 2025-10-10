import { IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsPositive } from "class-validator";

export class CreateTransferDto {
    @IsOptional()
    @IsMongoId({ message: 'Usuário deve ser um ObjectId válido' })
    userId: string;

    @IsNotEmpty({ message: 'Conta de origem é obrigatório' })
    @IsMongoId({ message: 'Conta de origem deve ser um ObjectId válido' })
    fromAccount: string;
    
    @IsNotEmpty({ message: 'Conta de destino é obrigatório' })
    @IsMongoId({ message: 'Conta de destino deve ser um ObjectId válido' })
    toAccount: string;

    @IsNotEmpty({ message: 'Quantia é obrigatório' })
    @IsNumber({}, { message: 'Quantia deve ser um number' })
    @IsPositive({ message: 'Quantia deve ser positiva' })
    amount: number;
}
