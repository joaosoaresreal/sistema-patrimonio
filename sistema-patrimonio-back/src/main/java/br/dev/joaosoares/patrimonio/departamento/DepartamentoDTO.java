package br.dev.joaosoares.patrimonio.departamento;

import br.dev.joaosoares.patrimonio.empresa.Empresa;
import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

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
    public Empresa empresa;
    
    public DepartamentoDTO(Departamento entity){
        this.id = entity.getId();
        this.nome = entity.getNome();
        this.telefone = entity.getTelefone();
        this.email = entity.getEmail();
        this.endereco = entity.getEndereco();
        this.empresa = entity.getEmpresa();
    }
}
