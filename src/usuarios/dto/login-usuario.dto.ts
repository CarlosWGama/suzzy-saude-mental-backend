import { IsEmail, IsString, IsNotEmpty, IsBoolean } from "class-validator";

export class LoginUsuarioDto {
    //===========
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;
    
    //===========
    @IsString()
    @IsNotEmpty()
    senha:string  

}
