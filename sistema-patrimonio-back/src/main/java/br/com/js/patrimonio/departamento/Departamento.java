package br.com.js.patrimonio.departamento;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.io.Serializable;

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
@Table(name = "tb_departamento")
public class Departamento implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;
    public String nome;
    public String telefone;
    public String email;
    public String endereco;
}
