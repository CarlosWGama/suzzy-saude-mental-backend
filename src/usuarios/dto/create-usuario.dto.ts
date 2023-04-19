import { IsEmail, IsString, IsNotEmpty, IsBoolean } from "class-validator";

export class CreateUsuarioDto {
    //===========
    @IsString()
    @IsNotEmpty()
    nome: string;
    
    //===========
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;
    
    //===========
    @IsString()
    @IsNotEmpty()
    senha:string  

    //===========
    @IsBoolean()
    admin?:boolean


    //===========
    // EXTRA   //
    //===========
    @IsString()
    telefone?: string;

    //===========
    @IsString()
    cpf?: string;

    //===========
    @IsString()
    data_nascimento?: string;

    //===========
    @IsString()
    genero?: string;

    //===========
    @IsString()
    escolaridade?: string;

    //===========
    @IsString()
    zona_residencial?: string;

    //===========
    @IsString()
    estado_civil?: string;

    //===========
    @IsString()
    orientacao_sexual?: string;

    //===========
    @IsBoolean()
    problema_mental?: boolean;

    //===========
    @IsBoolean()
    problema_mental_quais?: string;

    //===========
    @IsBoolean()
    uso_medicamento?: boolean
    
    //==========
    @IsString()
    uso_medicamento_quais?: string
}
