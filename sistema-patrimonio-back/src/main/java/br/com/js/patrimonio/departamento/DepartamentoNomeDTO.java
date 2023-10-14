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
public class DepartamentoNomeDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;
	private String nome;
}
