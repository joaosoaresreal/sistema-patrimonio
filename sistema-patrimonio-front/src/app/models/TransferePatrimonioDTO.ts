export interface TransferePatrimonioDTO{
    id: number,
    estadoAnterior: string,
    descricaoAnterior: string,
    localAnterior: string,
    obsAnterior: string,
    plaqueta: string,
    deptoAnterior: {
        id: number,
        nome: string
    },
    patrimonio:{
        id: number,
        plaqueta: string,
        descricao: string,
        estado: string,
        localizacao: string,
        observacao: string
        departamento:{
            id: number,
            nome: string
        }
    },
    dataHoraModificacao: any
}