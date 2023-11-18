package br.com.js.patrimonio.transferePatrimonio;

import java.io.Serializable;

import java.time.LocalDateTime;

import br.com.js.patrimonio.departamento.Departamento;
import br.com.js.patrimonio.enums.EstadoConservacao;
import br.com.js.patrimonio.patrimonio.Patrimonio;

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
public class TransferePatrimonioDTO implements Serializable {
    private static final Long serialVersionUID = 1L;

    private Long id;
    private EstadoConservacao estadoAnterior;
    private String descricaoAnterior;
    private String localAnterior;
    private String obsAnterior;
    private String plaqueta;
    private Departamento deptoAnterior;
    private Patrimonio patrimonio;
    protected LocalDateTime dataHoraModificacao;

    public TransferePatrimonioDTO(TransferePatrimonio entity) {
        this.id = entity.getId();
        this.estadoAnterior = entity.getEstadoAnterior();
        this.descricaoAnterior = entity.getDescricaoAnterior();
        this.localAnterior = entity.getLocalAnterior();
        this.obsAnterior = entity.getObsAnterior();
        //this.plaqueta = entity.getPlaqueta();
        this.deptoAnterior = entity.getDeptoAnterior();
        this.patrimonio = entity.getPatrimonio();
        this.dataHoraModificacao = entity.getDataHoraModificacao();
    }

}
