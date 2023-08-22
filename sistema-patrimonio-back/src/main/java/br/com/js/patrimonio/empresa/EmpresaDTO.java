package br.com.js.patrimonio.empresa;

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
public class EmpresaDTO implements Serializable {

    private static final Long serialVersionUID = 1L;

    private Long id;
    private String cnpj;
    private String nomeFantasia;
    private String telefone;
    private String email;
    private String endereco;


    public EmpresaDTO(Empresa entity) {
        this.id = entity.getId();
        this.cnpj = entity.getCnpj();
        this.nomeFantasia = entity.getNomeFantasia();
        this.telefone = entity.getTelefone();
        this.email = entity.getEmail();
        this.endereco = entity.getEndereco();
    }

}
