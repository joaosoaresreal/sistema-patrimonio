package br.dev.joaosoares.patrimonio.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.dao.EmptyResultDataAccessException;

import br.dev.joaosoares.patrimonio.empresa.Empresa;
import br.dev.joaosoares.patrimonio.empresa.EmpresaDTO;
import br.dev.joaosoares.patrimonio.empresa.EmpresaRepository;
import br.dev.joaosoares.patrimonio.empresa.EmpresaService;
import br.dev.joaosoares.patrimonio.services.exceptions.ResourcesNotFoundException;
import br.dev.joaosoares.patrimonio.sistemapatrimonio.tests.Factory;
import jakarta.persistence.EntityNotFoundException;

/**
 * Testes unitários para a classe {@link EmpresaService}.
 * <p>
 * Este teste utiliza JUnit para estruturar os casos de teste e Mockito para simular o comportamento do repositório {@link EmpresaRepository}.
 * </p>
 */
@ExtendWith(MockitoExtension.class)
public class EmpresaServiceTests {

    @Mock
    private EmpresaRepository repository;

    @InjectMocks
    private EmpresaService service;

    private Empresa empresa;
    private EmpresaDTO empresaDTO;
    private Long idExistente;
    private Long idInexistente;

    /**
     * Configuração inicial dos testes.
     * <p>
     * Este método é executado antes de cada teste para inicializar os objetos {@link Empresa} e {@link EmpresaDTO} utilizando a {@link Factory}.
     * </p>
     */
    @BeforeEach
    void setUp() {
        idExistente = 1L;
        idInexistente = 2L;
        empresa = Factory.createEmpresa();
        empresaDTO = Factory.createEmpresaDTO();
    }

    /**
     * Testa o método {@link EmpresaService#findAll()}.
     * <p>
     * Este teste verifica se o método retorna uma lista de {@link EmpresaDTO} corretamente, mapeando uma lista de {@link Empresa} do repositório.
     * </p>
     */
    @Test
    public void findAllDeveriaRetornarListaDeEmpresaDTO() {
        // Configura o comportamento do repositório para retornar uma lista contendo a empresa mockada
        when(repository.findAll()).thenReturn(List.of(empresa));

        // Chama o método a ser testado
        List<EmpresaDTO> result = service.findAll();

        // Verifica se o tamanho da lista é 1
        assertEquals(1, result.size());

        // Verifica se o primeiro elemento da lista é igual ao empresaDTO esperado
        assertEquals(empresaDTO, result.get(0));
    }

    /**
     * Testa o método {@link EmpresaService#findById(Long)}.
     * <p>
     * Este teste verifica se o método retorna um {@link EmpresaDTO} corretamente quando a empresa é encontrada pelo ID.
     * </p>
     */
    @Test
    public void findByIdDeveriaRetornarEmpresaDTO() {
        // Configura o comportamento do repositório para retornar a empresa mockada quando buscar pelo ID
        when(repository.findById(idExistente)).thenReturn(Optional.of(empresa));

        // Chama o método a ser testado
        EmpresaDTO result = service.findById(idExistente);

        // Verifica se o resultado é igual ao empresaDTO esperado
        assertEquals(empresaDTO, result);
    }

    /**
     * Testa o método {@link EmpresaService#findById(Long)} quando o ID não é encontrado.
     * <p>
     * Este teste verifica se uma {@link ResourcesNotFoundException} é lançada quando o ID não é encontrado no repositório.
     * </p>
     */
    @Test
    public void findByIdDeveriaLancarExcecaoQuandoIdNaoEncontrado() {
        // Configura o comportamento do repositório para retornar Optional.empty() quando buscar pelo ID
        when(repository.findById(idInexistente)).thenReturn(Optional.empty());

        // Verifica se uma ResourcesNotFoundException é lançada
        assertThrows(ResourcesNotFoundException.class, () -> service.findById(idInexistente));
    }

    /**
     * Testa o método {@link EmpresaService#insert(EmpresaDTO)}.
     * <p>
     * Este teste verifica se o método retorna um {@link EmpresaDTO} corretamente após inserir a empresa.
     * </p>
     */
    @Test
    public void insertDeveriaRetornarEmpresaDTO() {
        // Configura o comportamento do repositório para retornar a empresa mockada após salvar
        when(repository.save(any(Empresa.class))).thenReturn(empresa);

        // Chama o método a ser testado
        EmpresaDTO result = service.insert(empresaDTO);

        // Verifica se o resultado é igual ao empresaDTO esperado
        assertEquals(empresaDTO, result);
    }

    /**
     * Testa o método {@link EmpresaService#update(Long, EmpresaDTO)}.
     * <p>
     * Este teste verifica se o método retorna um {@link EmpresaDTO} corretamente após atualizar a empresa existente.
     * </p>
     */
    @Test
    public void updateDeveriaRetornarEmpresaDTOAtualizado() {
        // Configura o comportamento do repositório para retornar a empresa mockada quando buscar pelo ID
        when(repository.getReferenceById(idExistente)).thenReturn(empresa);
        // Configura o comportamento do repositório para retornar a empresa mockada após salvar
        when(repository.save(any(Empresa.class))).thenReturn(empresa);

        // Chama o método a ser testado
        EmpresaDTO result = service.update(idExistente, empresaDTO);

        // Verifica se o resultado é igual ao empresaDTO esperado
        assertEquals(empresaDTO, result);
    }

    /**
     * Testa o método {@link EmpresaService#update(Long, EmpresaDTO)} quando a empresa não é encontrada.
     * <p>
     * Este teste verifica se uma {@link ResourcesNotFoundException} é lançada quando o ID da empresa não é encontrado.
     * </p>
     */
    @Test
    public void updateDeveriaLancarExcecaoQuandoIdNaoEncontrado() {
        // Configura o comportamento do repositório para lançar uma EntityNotFoundException quando buscar pelo ID
        when(repository.getReferenceById(idExistente)).thenThrow(EntityNotFoundException.class);

        // Verifica se uma ResourcesNotFoundException é lançada
        assertThrows(ResourcesNotFoundException.class, () -> service.update(idExistente, empresaDTO));
    }

    /**
     * Testa o método {@link EmpresaService#delete(Long)}.
     * <p>
     * Este teste verifica se o método executa corretamente a exclusão e se o método deleteById é chamado uma vez.
     * </p>
     */
    @Test
    public void deleteDeveriaFazerNadaQuandoIdExistir() {
        Assertions.assertDoesNotThrow(() -> {
            // Chama o método a ser testado
            service.delete(idExistente);
        });

        // Verifica se o método deleteById foi chamado uma vez
        verify(repository, times(1)).deleteById(idExistente);
    }

    /**
     * Testa o método {@link EmpresaService#delete(Long)} quando a empresa não é encontrada.
     * <p>
     * Este teste verifica se uma {@link ResourcesNotFoundException} é lançada quando o ID da empresa não é encontrado para exclusão.
     * </p>
     */
    @Test
    public void deleteDeveriaLancarExcecaoQuandoIdNaoExistir() {
        // Configura o comportamento do repositório para lançar uma EmptyResultDataAccessException ao tentar excluir
        doThrow(EmptyResultDataAccessException.class).when(repository).deleteById(idInexistente);

        // Verifica se uma ResourcesNotFoundException é lançada
        assertThrows(ResourcesNotFoundException.class, () -> service.delete(idInexistente));
    }
}
