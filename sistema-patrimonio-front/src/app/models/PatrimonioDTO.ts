export interface PatrimonioDTO{
    id: number;
    plaqueta: string;
    descricao: string;
    estado: string;
    localizacao: string;
    dataEntrada: any;
    observacao: string;
    departamento: {
        id: number;
        nome: string};
}