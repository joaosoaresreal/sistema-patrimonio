package br.dev.joaosoares.patrimonio.transferePatrimonio;

import java.time.LocalDateTime;

import br.dev.joaosoares.patrimonio.departamento.Departamento;
import br.dev.joaosoares.patrimonio.enums.EstadoConservacao;
import br.dev.joaosoares.patrimonio.patrimonio.Patrimonio;
import br.dev.joaosoares.patrimonio.usuario.Usuario;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

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
@Table(name = "tb_transfere_patrimonio")
public class TransferePatrimonio {
	private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String plaqueta;
    @Enumerated(EnumType.STRING)
    private EstadoConservacao estado;
    private String localAnterior;
    private String obsAnterior;
    private String deptoAnterior;
    private LocalDateTime dataHoraModificacao;

    @ManyToOne // RELACIONAMENTO ENTRE AS CLASSES
    @JoinColumn(name = "id_departamentoTransf_fk")
    private Departamento deptoTransferencia;

    @ManyToOne // RELACIONAMENTO ENTRE AS CLASSES
    @JoinColumn(name = "id_patrimonio_fk")
    private Patrimonio patrimonio;

    @ManyToOne // RELACIONAMENTO ENTRE AS CLASSES
    @JoinColumn(name = "id_usuario_fk")
    private Usuario usuarioTransferencia;

}
