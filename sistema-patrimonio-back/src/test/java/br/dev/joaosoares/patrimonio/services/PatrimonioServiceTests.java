package br.dev.joaosoares.patrimonio.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import br.dev.joaosoares.patrimonio.baixaPatrimonio.BaixaPatrimonio;
import br.dev.joaosoares.patrimonio.baixaPatrimonio.BaixaPatrimonioDTO;
import br.dev.joaosoares.patrimonio.baixaPatrimonio.BaixaPatrimonioRepository;
import br.dev.joaosoares.patrimonio.patrimonio.Patrimonio;
import br.dev.joaosoares.patrimonio.patrimonio.PatrimonioDTO;
import br.dev.joaosoares.patrimonio.patrimonio.PatrimonioRepository;
import br.dev.joaosoares.patrimonio.patrimonio.PatrimonioService;
import br.dev.joaosoares.patrimonio.services.exceptions.ResourcesNotFoundException;
import br.dev.joaosoares.patrimonio.sistemapatrimonio.tests.Factory;
import br.dev.joaosoares.patrimonio.transferePatrimonio.TransferePatrimonio;
import br.dev.joaosoares.patrimonio.transferePatrimonio.TransferePatrimonioDTO;
import br.dev.joaosoares.patrimonio.transferePatrimonio.TransferePatrimonioRepository;

import jakarta.persistence.EntityNotFoundException;

/**
 * Testes unitários para a classe {@link PatrimonioService}.
 * <p>
 * Este teste utiliza JUnit para estruturar os casos de teste e Mockito para simular o comportamento do repositório {@link PatrimonioRepository}.
 * </p>
 */
@ExtendWith(MockitoExtension.class)
public class PatrimonioServiceTests {

	@InjectMocks
	private PatrimonioService patrimonioService;

	@Mock
	private PatrimonioRepository patrimonioRepository;

	@Mock
	private TransferePatrimonioRepository transferePatrimonioRepository;

	@Mock
	private BaixaPatrimonioRepository baixaPatrimonioRepository;

	private Patrimonio patrimonio;
	private PatrimonioDTO patrimonioDTO;
	private TransferePatrimonioDTO transferePatrimonioDTO;
	private BaixaPatrimonioDTO baixaPatrimonioDTO;

    /**
     * Configuração inicial dos testes.
     * <p>
     * Este método é executado antes de cada teste para inicializar os objetos {@link Patrimonio} e {@link PatrimonioDTO} utilizando a {@link Factory}.
     * </p>
     */
	@BeforeEach
	public void setUp() {
		MockitoAnnotations.openMocks(this);
		patrimonio = Factory.createPatrimonio();
		patrimonioDTO = Factory.createPatrimonioDTO();
		transferePatrimonioDTO = Factory.createTransferePatrimonioDTO();
		baixaPatrimonioDTO = Factory.createBaixaPatrimonioDTO();
	}

	/**
	 * Testa o método findAll do PatrimonioService. Verifica se todos os patrimônios
	 * são retornados corretamente.
	 */
	@Test
	public void findAllDeveriaRetornarListaDePatrimonioDTO() {
		when(patrimonioRepository.findAll()).thenReturn(List.of(patrimonio));
		List<PatrimonioDTO> result = patrimonioService.findAll();
		assertEquals(1, result.size());
		assertEquals(patrimonioDTO.getPlaqueta(), result.get(0).getPlaqueta());
	}

	/**
	 * Testa o método findById do PatrimonioService. Verifica se o patrimônio com o
	 * ID fornecido é retornado corretamente.
	 */
	@Test
	public void findByIdDeveriaRetornarPatrimonioDTO() {
		when(patrimonioRepository.findById(1L)).thenReturn(Optional.of(patrimonio));
		PatrimonioDTO result = patrimonioService.findById(1L);
		assertEquals(patrimonioDTO.getPlaqueta(), result.getPlaqueta());
	}

	/**
	 * Testa o método insert do PatrimonioService. Verifica se um novo patrimônio é
	 * inserido corretamente.
	 */
	@Test
	public void insertDeveriaRetornarPatrimonioDTO() {
		when(patrimonioRepository.save(any(Patrimonio.class))).thenReturn(patrimonio);
		PatrimonioDTO result = patrimonioService.insert(patrimonioDTO);
		assertNotNull(result);
		assertEquals(patrimonioDTO.getPlaqueta(), result.getPlaqueta());
		assertEquals(patrimonioDTO.getDescricao(), result.getDescricao());
	}

	/**
	 * Testa o método update do PatrimonioService. Verifica se um patrimônio
	 * existente é atualizado corretamente.
	 */
	@Test
	public void updateDeveriaRetornarPatrimonioDTOAtualizado() {
		when(patrimonioRepository.getReferenceById(1L)).thenReturn(patrimonio);
		when(patrimonioRepository.save(patrimonio)).thenReturn(patrimonio);
		PatrimonioDTO result = patrimonioService.update(1L, patrimonioDTO);
		assertEquals(patrimonioDTO.getPlaqueta(), result.getPlaqueta());
	}

	/**
	 * Testa o método update do PatrimonioService quando o patrimônio não é
	 * encontrado. Verifica se a exceção ResourcesNotFoundException é lançada.
	 */
	@Test
	public void updateDeveriaLancarExcecaoQuandoPatrimonioNaoEncontrado() {
		when(patrimonioRepository.getReferenceById(1L)).thenThrow(EntityNotFoundException.class);
		assertThrows(ResourcesNotFoundException.class, () -> patrimonioService.update(1L, patrimonioDTO));
	}

	/**
	 * Testa o método transferencia do PatrimonioService. Verifica se um patrimônio
	 * é transferido corretamente.
	 */
	@Test
	public void transferenciaDeveriaRetornarPatrimonioDTO() {
		when(patrimonioRepository.getReferenceById(1L)).thenReturn(patrimonio);
		when(transferePatrimonioRepository.save(any(TransferePatrimonio.class))).thenReturn(new TransferePatrimonio());
		when(patrimonioRepository.save(patrimonio)).thenReturn(patrimonio);
		PatrimonioDTO result = patrimonioService.transferencia(1L, transferePatrimonioDTO);
		assertEquals(patrimonioDTO.getPlaqueta(), result.getPlaqueta());
	}

	/**
	 * Testa o método transferencia do PatrimonioService quando o patrimônio não é
	 * encontrado. Verifica se a exceção ResourcesNotFoundException é lançada.
	 */
	@Test
	public void transferenciaDeveriaLancarExcecaoQuandoPatrimonioNaoEncontrado() {
		when(patrimonioRepository.getReferenceById(1L)).thenThrow(EntityNotFoundException.class);
		assertThrows(ResourcesNotFoundException.class,
				() -> patrimonioService.transferencia(1L, transferePatrimonioDTO));
	}

	/**
	 * Testa o método baixa do PatrimonioService. Verifica se um patrimônio é
	 * baixado corretamente.
	 */
	@Test
	public void baixaDeveriaRetornarPatrimonioDTO() {
		when(patrimonioRepository.getReferenceById(1L)).thenReturn(patrimonio);
		when(baixaPatrimonioRepository.save(any(BaixaPatrimonio.class))).thenReturn(new BaixaPatrimonio());
		when(patrimonioRepository.save(patrimonio)).thenReturn(patrimonio);
		PatrimonioDTO result = patrimonioService.baixa(1L, baixaPatrimonioDTO);
		assertEquals(patrimonioDTO.getPlaqueta(), result.getPlaqueta());
	}

	/**
	 * Testa o método baixa do PatrimonioService quando o patrimônio não é
	 * encontrado. Verifica se a exceção ResourcesNotFoundException é lançada.
	 */
	@Test
	public void baixaDeveriaLancarExcecaoQuandoPatrimonioNaoEncontrado() {
		when(patrimonioRepository.getReferenceById(1L)).thenThrow(EntityNotFoundException.class);
		assertThrows(ResourcesNotFoundException.class, () -> patrimonioService.baixa(1L, baixaPatrimonioDTO));
	}

	/**
	 * Testa o método findByPlaqueta do PatrimonioService. Verifica se um patrimônio
	 * é encontrado corretamente pela sua plaqueta.
	 */
	@Test
	public void findByPlaquetaDeveriaRetornarPatrimonioDTO() {
		when(patrimonioRepository.findByPlaqueta("AA0123")).thenReturn(patrimonio);
		PatrimonioDTO result = patrimonioService.findByPlaqueta("AA0123");
		assertEquals(patrimonioDTO.getPlaqueta(), result.getPlaqueta());
	}

	/**
	 * Testa o método findAtivosByDepartamento do PatrimonioService. Verifica se
	 * todos os patrimônios ativos de um departamento são retornados corretamente.
	 */
	@Test
	public void findAtivosByDepartamentoDeveriaRetornarListaDePatrimonioDTO() {
		when(patrimonioRepository.findAtivosByDepartamento(patrimonio.getDepartamento()))
				.thenReturn(List.of(patrimonio));
		List<PatrimonioDTO> result = patrimonioService.findAtivosByDepartamento(patrimonio.getDepartamento());
		assertEquals(1, result.size());
		assertEquals(patrimonioDTO.getPlaqueta(), result.get(0).getPlaqueta());
	}

	/**
	 * Testa o método findByAtivos do PatrimonioService. Verifica se todos os
	 * patrimônios ativos são retornados corretamente.
	 */
	@Test
	public void findByAtivosDeveriaRetornarListaDePatrimonioDTO() {
		when(patrimonioRepository.findByAtivos()).thenReturn(List.of(patrimonio));
		List<PatrimonioDTO> result = patrimonioService.findByAtivos();
		assertEquals(1, result.size());
		assertEquals(patrimonioDTO.getPlaqueta(), result.get(0).getPlaqueta());
	}
}
