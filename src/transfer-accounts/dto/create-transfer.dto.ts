import { IsNotEmpty } from "class-validator";

export class CreateTransferAccountDto {
    @IsNotEmpty({ message: 'Nome completo é obrigatório' })
    fullName: string;

    @IsNotEmpty({ message: 'Email é obrigatório' })
    email: string;

    @IsNotEmpty({ message: 'Telefone é obrigatório' })
    telephone: string;

    @Prop({ ref: Perfil.name, required: true })
    perfilId: Types.ObjectId;

    @IsNotEmpty({ message: 'Nome de usuário é obrigatório' })
    userName: string;

    @IsNotEmpty({ message: 'Nome de usuário é obrigatório' })
    password: string;
}
