import { 
    IsBoolean, 
    IsMongoId, 
    IsNotEmpty, 
    IsOptional, 
    IsString, 
    MaxLength, 
    MinLength 
} from "class-validator";

export class CreateCategoryDto {
    @IsNotEmpty({ message: 'Nome é obrigatório' })
    @IsString({ message: 'Nome deve ser uma string' })
    @MinLength(3, { message: 'Nome deve ter no mínimo 3 caracteres' })
    @MaxLength(50, { message: 'Nome deve ter no máximo 50 caracteres' })
    name: string;

    @IsNotEmpty({ message: 'Ícone é obrigatório' })
    @IsString({ message: 'Ícone deve ser uma string' })
    icon: string;

    @IsNotEmpty({ message: 'Cor é obrigatório' })
    @IsString({ message: 'Cor deve ser uma string' })
    colorHex: string;

    @IsOptional()
    @IsMongoId({ message: 'Usuário deve ser um ObjectId válido' })
    userId: string;

    @IsOptional()
    @IsBoolean()
    global: boolean;
}