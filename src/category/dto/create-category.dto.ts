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
    @IsString({ message: 'Nome deve ser uma string' })
    @IsNotEmpty({ message: 'Nome é obrigatório' })
    @MinLength(3, { message: 'Nome deve ter no mínimo 3 caracteres' })
    @MaxLength(50, { message: 'Nome deve ter no máximo 50 caracteres' })
    name: string;

    @IsString({ message: 'Ícone deve ser uma string' })
    @IsNotEmpty({ message: 'Ícone é obrigatório' })
    icon: string;

    @IsString({ message: 'Cor deve ser uma string' })
    @IsNotEmpty({ message: 'Cor é obrigatório' })
    colorHex: string;

    @IsNotEmpty({ message: 'Usuário é obrigatório' })
    @IsMongoId({ message: 'Usuário deve ser um ObjectId válido' })
    userId: string;

    @IsOptional()
    @IsBoolean()
    global: boolean;
}