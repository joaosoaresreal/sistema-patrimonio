package br.dev.joaosoares.patrimonio.relatorio;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.dev.joaosoares.patrimonio.departamento.Departamento;

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

	// Requisição para gerar o relatório de baixa
	@PostMapping("/gerar_rel_baixa")
    public ResponseEntity<byte[]> gerarRelatorioBaixa(@RequestBody RelatorioBaixaPatrimonioDTO dados) {
        try {
        	// cria o relatório em formato PDF com base nos dados fornecidos na solicitação
            byte[] relatorioPDF = relatorioService.gerarRelatorioBaixa(dados);

            HttpHeaders headers = new HttpHeaders();
            // indica que o conteúdo da resposta é um arquivo PDF
            headers.setContentType(MediaType.APPLICATION_PDF);
            // indica que o arquivo deve ser exibido "inline" no navegador e tem o nome "transferencia.pdf".
            headers.setContentDispositionFormData("inline", "baixa.pdf");
            // Retorna o PDF
            return new ResponseEntity<>(relatorioPDF, headers, HttpStatus.OK);
        } catch (IOException e) { // Tratamento de excessão
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Requisição para gerar o relatório de patrimonios geral (ativos)
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

    // Requisição para gerar o relatório de patrimonios por dpto
    @GetMapping("/gerar_rel_patrimonio/departamento") // EX.: /departamento?id=1
    public ResponseEntity<byte[]> gerarRelatorioPatrimonioDepto(Departamento departamento){
    	try {
    		byte[] relatorioPDF = relatorioService.gerarRelatorioPatrimonioDepto(departamento);

            HttpHeaders headers = new HttpHeaders();
            // indica que o conteúdo da resposta é um arquivo PDF
            headers.setContentType(MediaType.APPLICATION_PDF);
            // indica que o arquivo deve ser exibido "inline" no navegador e tem o nome "transferencia.pdf".
            headers.setContentDispositionFormData("inline", "patrimonios-departamento.pdf");
            // Retorna o PDF
            return new ResponseEntity<>(relatorioPDF, headers, HttpStatus.OK);
    	} catch (IOException e) {
    		 e.printStackTrace();
             return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    	}
    }

    // Requisição para gerar o relatório de patrimonios baixados - GERAL (TODOS)
    @GetMapping("/gerar_rel_baixa")
    public ResponseEntity<byte[]> gerarRelatorioBaixaGeral(){
    	try {
    		byte[] relatorioPDF = relatorioService.gerarRelatorioBaixaGeral();

            HttpHeaders headers = new HttpHeaders();
            // indica que o conteúdo da resposta é um arquivo PDF
            headers.setContentType(MediaType.APPLICATION_PDF);
            // indica que o arquivo deve ser exibido "inline" no navegador e tem o nome "baixas-geral.pdf".
            headers.setContentDispositionFormData("inline", "baixas-geral.pdf");
            // Retorna o PDF
            return new ResponseEntity<>(relatorioPDF, headers, HttpStatus.OK);
    	} catch (IOException e) {
    		 e.printStackTrace();
             return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    	}
    } 

    // Requisição para gerar o relatório de baixa por dpto
    @GetMapping("/gerar_rel_baixa/departamento/{id}")
    public ResponseEntity<byte[]> gerarRelatorioBaixaDepto(@PathVariable int id){
    	try {
    		byte[] relatorioPDF = relatorioService.gerarRelatorioBaixaDepto(id);

            HttpHeaders headers = new HttpHeaders();
            // indica que o conteúdo da resposta é um arquivo PDF
            headers.setContentType(MediaType.APPLICATION_PDF);
            // indica que o arquivo deve ser exibido "inline" no navegador e tem o nome "baixa-departamento.pdf".
            headers.setContentDispositionFormData("inline", "baixa-departamento.pdf");
            // Retorna o PDF
            return new ResponseEntity<>(relatorioPDF, headers, HttpStatus.OK);
    	} catch (IOException e) {
    		 e.printStackTrace();
             return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    	}
    }


}
