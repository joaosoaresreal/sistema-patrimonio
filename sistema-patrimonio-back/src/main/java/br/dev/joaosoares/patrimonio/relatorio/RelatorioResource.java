package br.dev.joaosoares.patrimonio.relatorio;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/api_relatorio")
public class RelatorioResource {
	private final RelatorioService relatorioService;

	public RelatorioResource(RelatorioService relatorioService) {
        this.relatorioService = relatorioService;
    }

	// Requisição para gerar o relatório de transferencia
	@PostMapping("/gerar_rel_transf")
    public ResponseEntity<byte[]> gerarRelatorioTransferencia(@RequestBody RelatorioTransferePatrimonioDTO dados) {
        try {
        	// cria o relatório em formato PDF com base nos dados fornecidos na solicitação
            byte[] relatorioPDF = relatorioService.gerarRelatorioTransferencia(dados);

            HttpHeaders headers = new HttpHeaders();
            // indica que o conteúdo da resposta é um arquivo PDF
            headers.setContentType(MediaType.APPLICATION_PDF);
            // indica que o arquivo deve ser exibido "inline" no navegador e tem o nome "transferencia.pdf".
            headers.setContentDispositionFormData("inline", "transferencia.pdf");
            // Retorna o PDF
            return new ResponseEntity<>(relatorioPDF, headers, HttpStatus.OK);
        } catch (IOException e) { // Tratamento de excessão
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Requisição para gerar o relatório de patrimonios geral
    @GetMapping("/gerar_rel_patrimonio")
    public ResponseEntity<byte[]> gerarRelatorioPatrimonioGeral(){
    	try {
    		byte[] relatorioPDF = relatorioService.gerarRelatorioPatrimonioGeral();
    		
            HttpHeaders headers = new HttpHeaders();
            // indica que o conteúdo da resposta é um arquivo PDF
            headers.setContentType(MediaType.APPLICATION_PDF);
            // indica que o arquivo deve ser exibido "inline" no navegador e tem o nome "transferencia.pdf".
            headers.setContentDispositionFormData("inline", "patrimonios.pdf");
            // Retorna o PDF
            return new ResponseEntity<>(relatorioPDF, headers, HttpStatus.OK);
    	} catch (IOException e) {
    		 e.printStackTrace();
             return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    	}
    }
    
}
