package br.dev.joaosoares.patrimonio.relatorio;

import java.io.IOException;

public interface RelatorioService {
    byte[] gerarRelatorioTransferencia(RelatorioTransferePatrimonioDTO dados) throws IOException;

    byte[] gerarRelatorioBaixa(RelatorioBaixaPatrimonioDTO dados) throws IOException;

    byte[] gerarRelatorioPatrimonioGeral() throws IOException;

    //byte[] gerarRelatorio2(RelatorioBaixaPatrimonioDTO dados) throws IOException;
}