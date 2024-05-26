export interface UsuarioDTO{
    id: number;
    nome: string;
    cpf: string;
    telefone: string;
    foto: string;
    email: string;
    senha: string;
    departamento: {
        id: number,
        nome: string,
        empresa:{
            nomeFantasia: string;
        }
    }
    roles: {
        id: number,
        authority: string
    }
}