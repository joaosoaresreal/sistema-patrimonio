export interface TransferePatrimonioDTO{
    id: number,
    plaqueta: string,
    estado: string,
    localAnterior: string,
    obsAnterior: string,
    deptoAnterior: string,
    deptoTransferencia: {
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
    dataHoraModificacao: any,
    usuarioTransferencia:{
        id: number,
        nome: string
    }
}