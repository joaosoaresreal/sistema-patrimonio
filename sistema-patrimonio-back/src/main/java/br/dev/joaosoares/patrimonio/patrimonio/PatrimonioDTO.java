package br.dev.joaosoares.patrimonio.patrimonio;

import br.dev.joaosoares.patrimonio.departamento.Departamento;
import br.dev.joaosoares.patrimonio.enums.EstadoConservacao;
import br.dev.joaosoares.patrimonio.enums.Status;

import java.io.Serializable;

import java.time.LocalDate;

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
public class PatrimonioDTO implements Serializable {
    private static final Long serialVersionUID = 1L;

    private Long id;
    private String plaqueta;
    private String descricao;
    private EstadoConservacao estado;
    private Status status;
    private String localizacao;
    private LocalDate dataEntrada;
    private String observacao;
    private Departamento departamento;

    public PatrimonioDTO(Patrimonio entity){
        this.id = entity.getId();
        this.plaqueta = entity.getPlaqueta();
        this.descricao = entity.getDescricao();
        this.estado = entity.getEstado();
        this.status = entity.getStatus();
        this.localizacao = entity.getLocalizacao();
        this.dataEntrada = entity.getDataEntrada();
        this.observacao = entity.getObservacao();
        this.departamento = entity.getDepartamento();
    }

}
