import { IsMongoId, IsNotEmpty, IsNumber, IsPositive } from "class-validator";

export class CreateTransferDto {
    @IsNotEmpty({ message: 'Usuário é obrigatório' })
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
