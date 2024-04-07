package br.dev.joaosoares.patrimonio.usuario;

import br.dev.joaosoares.patrimonio.departamento.Departamento;
import br.dev.joaosoares.patrimonio.role.RoleDTO;

import java.io.Serializable;

import java.util.HashSet;
import java.util.Set;

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
public class UsuarioDTO implements Serializable {

    private static final Long serialVersionUID = 1L;

    private Long id;
    private String nome;
    private String cpf;
    private String telefone;
    private String foto;
    private String email;
    private Departamento departamento;
    
    private Set<RoleDTO> roles = new HashSet<>();

    public UsuarioDTO(Usuario entity) {
        this.id = entity.getId();
        this.nome = entity.getNome();
        this.cpf = entity.getCpf();
        this.telefone = entity.getTelefone();
        this.foto = entity.getFoto();
        this.email = entity.getEmail();
        this.departamento = entity.getDepartamento();
        entity.getRoles().forEach(role -> this.roles.add(new RoleDTO(role)));
    }

    public Set<RoleDTO> getRoles() {
        return roles;
    }
}
