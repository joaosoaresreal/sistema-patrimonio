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
    private String plaqueta;
    private EstadoConservacao estado;
    private String localAnterior;
    private String obsAnterior;
    private String deptoAnterior;
    private Departamento deptoTransferencia;
    private Patrimonio patrimonio;
    protected LocalDateTime dataHoraModificacao;

    public TransferePatrimonioDTO(TransferePatrimonio entity) {
        this.id = entity.getId();
        this.plaqueta = entity.getPlaqueta();
        this.localAnterior = entity.getLocalAnterior();
        this.obsAnterior = entity.getObsAnterior();
        this.deptoAnterior = entity.getDeptoAnterior();
        this.deptoTransferencia = entity.getDeptoTransferencia();
        this.patrimonio = entity.getPatrimonio();
        this.dataHoraModificacao = entity.getDataHoraModificacao();
    }

}
