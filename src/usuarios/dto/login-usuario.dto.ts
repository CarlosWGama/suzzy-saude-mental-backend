import { IsEmail, IsString, IsNotEmpty, IsBoolean, MinLength } from "class-validator";

export class LoginUsuarioDto {
    //===========
    @IsEmail()
    @IsNotEmpty({message: 'O campo email não pode estar vázio'})
    email: string;
    
    //===========
    @MinLength(5, {message: 'O campo senha precisa ter pelo menos 5 caracteres'})
    @IsNotEmpty({message: 'O cmapo email é obrigatório'})
    senha:string  

}
