import { IsBoolean, IsEmail, IsEmpty, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUsuarioDto  {

    //===========
    @IsEmpty({message: "O campo id não pode ser alterado!"})
    id: number;

    //===========
    @IsString({message: 'Nome deve ser um texto'})
    @IsNotEmpty({message: 'Nome é um campo obrigatório'})
    nome: string;
    
    //===========
    @IsEmpty({message: "O campo email não pode ser alterado!"})
    email: string;
    
    //===========
    @IsString({message: 'Senha deve ser um texto'})
    @IsNotEmpty({message: 'Senha é um campo obrigatório'})
    @IsOptional()
    @MinLength(5, { message: 'Senha precisa ter no mínimo 5 caracteres' })
    senha:string  

    //===========
    @IsBoolean({message: 'Admin deve ser um booleano'})
    @IsOptional()
    admin?:boolean


    //===========
    // EXTRA   //
    //===========
    @IsString({message: 'Telefone deve ser um texto'})
    @IsOptional()
    telefone?: string;

    //===========
    @IsString({message: 'CPF deve ser um texto'})
    @IsOptional()
    cpf?: string;

    //===========
    @IsString({message: 'Data de Nascimento em formato inválido'})
    @IsOptional()
    data_nascimento?: string;

    //===========
    @IsString({message: 'Gênero deve ser um texto'})
    @IsOptional()
    genero?: string;

    //===========
    @IsString({message: 'Escolaridade deve ser um texto'})
    @IsOptional()
    escolaridade?: string;

    //===========
    @IsString({message: 'Zona Residencial deve ser um texto'})
    @IsOptional()
    zona_residencial?: string;

    //===========
    @IsString({message: 'Estado Cívil deve ser um texto'})
    @IsOptional()
    estado_civil?: string;

    //===========
    @IsString({message: 'Orientação Sexual deve ser um texto'})
    @IsOptional()
    orientacao_sexual?: string;

    //===========
    @IsBoolean({message: 'Problema Mental deve ser um booleano'})
    @IsOptional()
    problema_mental?: boolean;

    //===========
    @IsString({message: 'Os problemas mentais devem ser um texto'})
    @IsOptional()
    problema_mental_quais?: string;

    //===========
    @IsBoolean({message: 'Uso de medicamento deve ser um booleano'})
    @IsOptional()
    uso_medicamento?: boolean
    
    //==========
    @IsString({message: 'Os medicamentos deve ser um texto'})
    @IsOptional()
    uso_medicamento_quais?: string
}
