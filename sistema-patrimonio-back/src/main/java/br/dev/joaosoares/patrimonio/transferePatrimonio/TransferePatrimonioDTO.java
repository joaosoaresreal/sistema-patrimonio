package br.dev.joaosoares.patrimonio.transferePatrimonio;

import java.io.Serializable;

import java.time.LocalDateTime;

import br.dev.joaosoares.patrimonio.departamento.Departamento;
import br.dev.joaosoares.patrimonio.enums.EstadoConservacao;
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
public class TransferePatrimonioDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    private Long id;
    private String plaqueta;
    private EstadoConservacao estado;
    private String localAnterior;
    private String obsAnterior;
    private String deptoAnterior;
    private LocalDateTime dataHoraModificacao;
    private Departamento deptoTransferencia;
    private Patrimonio patrimonio;
    private Usuario usuarioTransferencia;

    public TransferePatrimonioDTO(TransferePatrimonio entity) {
        this.id = entity.getId();
        this.plaqueta = entity.getPlaqueta();
        this.estado = entity.getEstado();
        this.localAnterior = entity.getLocalAnterior();
        this.obsAnterior = entity.getObsAnterior();
        this.deptoAnterior = entity.getDeptoAnterior();
        this.dataHoraModificacao = entity.getDataHoraModificacao();
        this.deptoTransferencia = entity.getDeptoTransferencia();
        this.patrimonio = entity.getPatrimonio();
        this.usuarioTransferencia = entity.getUsuarioTransferencia();
    }

}
