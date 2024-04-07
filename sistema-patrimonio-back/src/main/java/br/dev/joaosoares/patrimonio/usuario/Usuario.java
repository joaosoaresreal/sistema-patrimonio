package br.dev.joaosoares.patrimonio.usuario;

import br.dev.joaosoares.patrimonio.departamento.Departamento;
import br.dev.joaosoares.patrimonio.role.Role;
import jakarta.persistence.Column;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

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
@Table(name = "tb_usuario")
public class Usuario implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(columnDefinition = "TEXT")
    private String nome;
    @Column(unique = true)
	@NotBlank(message = "Campo obrigatório")
    private String cpf;
    private String telefone;
    private String foto;
    @Column(unique = true)
    private String email;
    private String senha;

    // LAZY --> 'Carregamento preguiçoso' não tem necessidade de ir junto
    // EAGER --> 'Força o relacionamento', ao iniciar a classe ele já envia a relação
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "tb_usuario_role",
            joinColumns = @JoinColumn(name = "usuario_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>(); // Set são valores distintos, List permite valores repetidos

    @ManyToOne // RELACIONAMENTO ENTRE AS CLASSES
    @JoinColumn(name = "id_departamento_fk")
    private Departamento departamento;

    public Set<Role> getRoles() {
        return roles;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

}
