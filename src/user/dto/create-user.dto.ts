import { 
  IsEmail, 
  IsNotEmpty, 
  IsString, 
  MinLength,
  MaxLength,
  Matches 
} from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Nome completo deve ser uma string' })
  @IsNotEmpty({ message: 'Nome completo é obrigatório' })
  @MinLength(3, { message: 'Nome completo deve ter no mínimo 3 caracteres' })
  @MaxLength(100, { message: 'Nome completo deve ter no máximo 100 caracteres' })
  fullName: string;

  @IsEmail({}, { message: 'Email inválido' })
  @IsNotEmpty({ message: 'Email é obrigatório' })
  email: string;

  @IsString({ message: 'Nome de usuário deve ser uma string' })
  @IsNotEmpty({ message: 'Nome de usuário é obrigatório' })
  @MinLength(3, { message: 'Nome de usuário deve ter no mínimo 3 caracteres' })
  @MaxLength(30, { message: 'Nome de usuário deve ter no máximo 30 caracteres' })
  @Matches(/^[a-zA-Z0-9_-]+$/, {
    message: 'Nome de usuário pode conter apenas letras, números, underscore e hífen'
  })
  userName: string;

  @IsString({ message: 'Senha deve ser uma string' })
  @IsNotEmpty({ message: 'Senha é obrigatória' })
  @MinLength(6, { message: 'Senha deve ter no mínimo 6 caracteres' })
  @MaxLength(255, { message: 'Senha deve ter no máximo 255 caracteres' })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]/,
    {
      message: 'Senha deve conter pelo menos uma letra maiúscula, uma minúscula, um número e um caractere especial'
    }
  )
  password: string;
}