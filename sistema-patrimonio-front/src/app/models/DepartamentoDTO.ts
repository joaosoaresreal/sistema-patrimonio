export interface DepartamentoDTO{
    id: number;
    nome: String;
    telefone: String;
    email: String;
    endereco: String;
    empresa:{
        nome: String;
    }
}