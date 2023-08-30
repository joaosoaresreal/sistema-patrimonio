package br.com.js.patrimonio.usuario;

import br.com.js.patrimonio.departamento.Departamento;
import java.io.Serializable;

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
    private String senha;
    private Departamento departamento;

    
    public UsuarioDTO(Usuario entity) {
        this.id = entity.getId();
        this.nome = entity.getNome();
        this.cpf = entity.getCpf();
        this.telefone = entity.getTelefone();
        this.foto = entity.getFoto();
        this.email = entity.getEmail();
        this.senha = entity.getSenha();
        this.departamento = entity.getDepartamento();
    }

}
