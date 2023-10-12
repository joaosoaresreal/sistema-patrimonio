export interface DepartamentoDTO{
    id: number;
    nome: string;
    telefone: string;
    email: string;
    endereco: string;
    empresa:{
        id: number,
        nome: string;
    }
}