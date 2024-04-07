package br.dev.joaosoares.patrimonio.relatorio;

import lombok.Data;

@Data
public class RelatorioBaixaPatrimonioDTO {

	private String plaqueta;
	private String descricao;
	private String observacao;
	private String motivo;
	private String nomeProfissional;
	private String cpfProfissional;
	private String data;
}
