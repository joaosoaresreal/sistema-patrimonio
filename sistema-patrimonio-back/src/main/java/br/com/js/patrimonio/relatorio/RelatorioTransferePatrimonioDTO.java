package br.com.js.patrimonio.relatorio;

import lombok.Data;

@Data
public class RelatorioTransferePatrimonioDTO {

	private String user;
	private String deptoUser;
	private String deptoRecebedor;
	private String plaqueta;
	private String descricao;
	private String estado;
	private String observacao;
	private String data;
}
