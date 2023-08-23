package br.com.js.patrimonio.departamento;

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
public class DepartamentoDTO implements Serializable {
    private static final Long serialVersionUID = 1L;
    
    public Long id;
    public String nome;
    public String telefone;
    public String email;
    public String endereco;
    
    public DepartamentoDTO(Departamento entity){
        this.id = entity.getId();
        this.nome = entity.getNome();
        this.telefone = entity.getTelefone();
        this.email = entity.getEmail();
        this.endereco = entity.getEndereco();
    }
}
