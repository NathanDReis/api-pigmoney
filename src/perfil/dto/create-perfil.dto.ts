import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreatePerfilDto {
    @IsNotEmpty({ message: 'Nome é obrigatório' })
    @IsString({ message: 'Nome deve ser uma string' })
    @MaxLength(20, { message: 'Nome deve ter no máximo 20 caracteres' })
    name: string;

    @IsArray({ message: 'Permissões deve ser uma array' })
    @ArrayNotEmpty({ message: 'Permissões é obrigatório' })
    @IsString({ each: true, message: 'Cada permissão deve ser uma string' })
    permissions: string[];
}
