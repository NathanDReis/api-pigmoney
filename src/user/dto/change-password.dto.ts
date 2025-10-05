import { IsNotEmpty, IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  @IsNotEmpty({ message: 'Senha atual é obrigatória' })
  currentPassword: string;

  @IsString()
  @IsNotEmpty({ message: 'Nova senha é obrigatória' })
  @MinLength(6, { message: 'Nova senha deve ter no mínimo 6 caracteres' })
  @MaxLength(255, { message: 'Nova senha deve ter no máximo 255 caracteres' })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]/,
    {
      message: 'Nova senha deve conter pelo menos uma letra maiúscula, uma minúscula, um número e um caractere especial'
    }
  )
  newPassword: string;
}