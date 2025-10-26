import { 
  IsEnum,
  IsMongoId, 
  IsNotEmpty, 
  IsNumber, 
  IsOptional, 
  IsPositive, 
  IsString, 
} from "class-validator";

export enum LaunchType {
  INCOME = 'income',
  EXPENSE = 'expense'
}

export class CreateLaunchDto {
  @IsOptional()
  @IsMongoId({ message: 'Usuário deve ser um ObjectId válido' })
  userId?: string;

  @IsNotEmpty({ message: 'Categoria é obrigatório' })
  @IsMongoId({ message: 'Categoria deve ser um ObjectId válido' })
  categoryId: string;

  @IsNotEmpty({ message: 'Conta é obrigatório' })
  @IsMongoId({ message: 'Conta deve ser um ObjectId válido' })
  accountId: string;

  @IsOptional()
  @IsString({ message: 'Descrição deve ser uma string' })
  description?: string;

  @IsNotEmpty({ message: 'Quantia é obrigatório' })
  @IsNumber({}, { message: 'Quantia deve ser um número' })
  @IsPositive({ message: 'Quantia não deve ser negativa' })
  amount: number;

  @IsNotEmpty({ message: 'Tipo é obrigatório' })
  @IsEnum(LaunchType, { message: 'Tipo deve ser receita ou despesa' })
  type: string;
}
