package br.dev.joaosoares.patrimonio.baixaPatrimonio;

import java.io.Serializable;
import java.time.LocalDateTime;

import br.dev.joaosoares.patrimonio.patrimonio.Patrimonio;
import br.dev.joaosoares.patrimonio.usuario.Usuario;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@Builder
public class BaixaPatrimonioDTO implements Serializable {
	private static final long serialVersionUID = 1L;

    private Long id;
    private String plaqueta;
    private String descricao;
    private String motivo;
    private String nomeProfissionalBaixa;
    private String cpfProfissionalBaixa;
    private LocalDateTime dataBaixa;
    private Usuario usuarioBaixa;
    private Patrimonio patrimonio;

    public BaixaPatrimonioDTO(BaixaPatrimonio entity) {
    	this.id = entity.getId();
    	this.plaqueta = entity.getPlaqueta();
    	this.descricao = entity.getDescricao();
    	this.motivo = entity.getMotivo();
    	this.nomeProfissionalBaixa = entity.getNomeProfissionalBaixa();
    	this.cpfProfissionalBaixa = entity.getCpfProfissionalBaixa();
    	this.dataBaixa = entity.getDataBaixa();
    	this.usuarioBaixa = entity.getUsuarioBaixa();
    	this.patrimonio = entity.getPatrimonio();
    }

}
