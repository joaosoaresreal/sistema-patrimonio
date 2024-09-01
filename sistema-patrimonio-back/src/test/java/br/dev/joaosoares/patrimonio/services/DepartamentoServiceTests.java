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

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.dao.EmptyResultDataAccessException;

import br.dev.joaosoares.patrimonio.departamento.Departamento;
import br.dev.joaosoares.patrimonio.departamento.DepartamentoDTO;
import br.dev.joaosoares.patrimonio.departamento.DepartamentoNomeDTO;
import br.dev.joaosoares.patrimonio.departamento.DepartamentoRepository;
import br.dev.joaosoares.patrimonio.departamento.DepartamentoService;
import br.dev.joaosoares.patrimonio.services.exceptions.ResourcesNotFoundException;
import br.dev.joaosoares.patrimonio.sistemapatrimonio.tests.Factory;

import jakarta.persistence.EntityNotFoundException;

/**
 * Testes unitários para a classe {@link DepartamentoService}.
 * <p>
 * Este teste utiliza JUnit para estruturar os casos de teste e Mockito para simular o comportamento do repositório {@link DepartamentoRepository}.
 * </p>
 */
@ExtendWith(MockitoExtension.class)
public class DepartamentoServiceTests {

    @InjectMocks
    private DepartamentoService service;

    @Mock
    private DepartamentoRepository repository;

    private long idExistente;
    private long idInexistente;
    private Departamento departamento;
    private DepartamentoDTO departamentoDTO;

    /**
     * Configuração inicial dos testes.
     * <p>
     * Este método é executado antes de cada teste para inicializar os objetos {@link Departamento} e {@link DepartamentoDTO} utilizando a {@link Factory}.
     * </p>
     */
    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        idExistente = 1L;
        idInexistente = 2L;
        departamento = Factory.createDepartamento();
        departamentoDTO = Factory.createDepartamentoDTO();
    }

    /**
     * Testa o método `findAll` do serviço.
     * Deve retornar uma lista de `DepartamentoDTO`.
     */
    @Test
    public void findAllDeveriaRetornarListaDeDepartamentoDTO() {
        // Configura o comportamento do repositório
        when(repository.findAll()).thenReturn(List.of(departamento));

        // Chama o método a ser testado
        List<DepartamentoDTO> result = service.findAll();

        // Verifica se o método retornou a lista esperada
        assertEquals(1, result.size());
        assertEquals(departamentoDTO, result.get(0));
    }

    /**
     * Testa o método `findById` do serviço.
     * Deve retornar um `DepartamentoDTO` quando o ID existir.
     */
    @Test
    public void findByIdDeveriaRetornarDepartamentoDTOQuandoIdExistir() {
        // Configura o comportamento do repositório
        when(repository.findById(idExistente)).thenReturn(Optional.of(departamento));

        // Chama o método a ser testado
        DepartamentoDTO result = service.findById(idExistente);

        // Verifica se o método retornou o DTO esperado
        assertEquals(departamentoDTO, result);
    }

    /**
     * Testa o método `findById` do serviço.
     * Deve lançar uma exceção quando o ID não existir.
     */
    @Test
    public void findByIdDeveriaLancarExcecaoQuandoIdNaoExistir() {
        // Configura o comportamento do repositório
        when(repository.findById(idInexistente)).thenReturn(Optional.empty());

        // Verifica se o método lança a exceção esperada
        assertThrows(ResourcesNotFoundException.class, () -> {
            service.findById(idInexistente);
        });
    }

    /**
     * Testa o método `insert` do serviço.
     * Deve inserir um novo departamento e retornar o `DepartamentoDTO` correspondente.
     */
    @Test
    public void insertDeveriaInserirDepartamentoESalvarDTO() {
        // Configura o comportamento do repositório
        when(repository.save(any(Departamento.class))).thenReturn(departamento);

        // Chama o método a ser testado
        DepartamentoDTO result = service.insert(departamentoDTO);

        // Verifica se o método retornou o DTO esperado
        assertEquals(departamentoDTO, result);
    }

    /**
     * Testa o método `update` do serviço.
     * Deve atualizar um departamento existente e retornar o `DepartamentoDTO` atualizado.
     */
    @Test
    public void updateDeveriaAtualizarDepartamentoQuandoIdExistir() {
        // Configura o comportamento do repositório
        when(repository.getReferenceById(idExistente)).thenReturn(departamento);
        when(repository.save(any(Departamento.class))).thenReturn(departamento);

        // Chama o método a ser testado
        DepartamentoDTO result = service.update(idExistente, departamentoDTO);

        // Verifica se o método retornou o DTO esperado
        assertEquals(departamentoDTO, result);
    }

    /**
     * Testa o método `update` do serviço.
     * Deve lançar uma exceção quando o ID não existir.
     */
    @Test
    public void updateDeveriaLancarExcecaoQuandoIdNaoExistir() {
        // Configura o comportamento do repositório
        when(repository.getReferenceById(idInexistente)).thenThrow(EntityNotFoundException.class);

        // Verifica se o método lança a exceção esperada
        assertThrows(ResourcesNotFoundException.class, () -> {
            service.update(idInexistente, departamentoDTO);
        });
    }

    /**
     * Testa o método `delete` do serviço.
     * Deve excluir um departamento quando o ID existir.
     */
    @Test
    public void deleteDeveriaExcluirQuandoIdExistir() {
        // Chama o método a ser testado
        service.delete(idExistente);

        // Verifica se o método deleteById foi chamado uma vez
        verify(repository, times(1)).deleteById(idExistente);
    }

    /**
     * Testa o método `delete` do serviço.
     * Deve lançar uma exceção quando tentar excluir um departamento com ID que não existe.
     */
    @Test
    public void deleteDeveriaLancarExcecaoQuandoIdNaoExistir() {
        // Simula o comportamento do repositório para lançar a exceção quando o ID não existir
        doThrow(EmptyResultDataAccessException.class).when(repository).deleteById(idInexistente);

        // Verifica se o método lança a exceção esperada
        assertThrows(ResourcesNotFoundException.class, () -> {
            service.delete(idInexistente);
        });
    }

    /**
     * Testa o método `findByNomeSQL` do serviço.
     * Deve retornar uma lista de `DepartamentoNomeDTO`.
     */
    @Test
    public void findByNomeSQLDeveriaRetornarListaDeDepartamentoNomeDTO() {
        // Configura o comportamento do repositório
        when(repository.findByNomeSQL()).thenReturn(List.of(new DepartamentoNomeDTO()));

        // Chama o método a ser testado
        List<DepartamentoNomeDTO> result = service.findByNomeSQL();

        // Verifica se o método retornou a lista esperada
        assertEquals(1, result.size());
    }

}
