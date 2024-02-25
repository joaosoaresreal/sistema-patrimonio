package br.dev.joaosoares.patrimonio.patrimonio;

import br.dev.joaosoares.patrimonio.departamento.Departamento;
import br.dev.joaosoares.patrimonio.enums.EstadoConservacao;
import br.dev.joaosoares.patrimonio.enums.Status;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import java.io.Serializable;
import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data // Implementa os métodos GET e SET para cada atributo
@EqualsAndHashCode // Cria os métodos equals e hashCode que é utilizado para comparação
@AllArgsConstructor // cria construtores com todos os atributos
@NoArgsConstructor // cria construtor sem parâmetros
@Builder // padrão de projeto para construção de objetos
@Entity
@Table(name = "tb_patrimonio")
public class Patrimonio implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique=true)
    private String plaqueta;
    @Column(columnDefinition = "TEXT")
    private String descricao;
    @Enumerated(EnumType.STRING)
    private EstadoConservacao estado;
    @Enumerated(EnumType.STRING)
    private Status status;
    private String localizacao;
    private LocalDate dataEntrada;
    @Column(columnDefinition = "TEXT")
    private String observacao;

    @ManyToOne // RELACIONAMENTO ENTRE AS CLASSES
    @JoinColumn(name = "id_departamento_fk")
    private Departamento departamento;

}
