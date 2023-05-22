import { IsString, IsNotEmpty, IsOptional } from "class-validator";


export class CreateContatoDto {

    @IsString({message: 'Nome deve ser um texto'})
    @IsNotEmpty({message: 'Nome é um campo obrigatório'})
    nome: string;
    
    //===========
    @IsString({message: 'Telefone deve ser um texto'})
    @IsNotEmpty({message: 'Telefone é um campo obrigatório'})
    telefone: string;

    //===========
    @IsOptional()
    usuario_id?: number;

}
