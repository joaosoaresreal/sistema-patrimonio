package br.dev.joaosoares.patrimonio.baixaPatrimonio;

import java.time.LocalDateTime;

import br.dev.joaosoares.patrimonio.patrimonio.Patrimonio;
import br.dev.joaosoares.patrimonio.usuario.Usuario;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
@Table(name = "tb_baixa_patrimonio")
public class BaixaPatrimonio {
	private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String plaqueta;
    @Column(columnDefinition = "TEXT")
    private String descricao;
    @Column(columnDefinition = "TEXT")
    private String motivo;
    private String nomeProfissionalBaixa;
    private String cpfProfissionalBaixa;
    private LocalDateTime dataBaixa;

    @ManyToOne // RELACIONAMENTO ENTRE AS CLASSES
    @JoinColumn(name = "id_patrimonio_fk")
    private Patrimonio patrimonio;

    @ManyToOne // RELACIONAMENTO ENTRE AS CLASSES
    @JoinColumn(name = "id_usuario_fk")
    private Usuario usuarioBaixa;
}
