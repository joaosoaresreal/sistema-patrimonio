export interface UsuarioDTO{
    id: number;
    nome: String;
    cpf: String;
    telefone: String;
    foto: String;
    email: String;
    senha: String;
    departamento: {
        nome: String;
        empresa:{
            nomeFantasia: String;
        }
    }
}