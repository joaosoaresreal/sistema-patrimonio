package br.dev.joaosoares.patrimonio.services;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import br.dev.joaosoares.patrimonio.sistemapatrimonio.tests.Factory;
import br.dev.joaosoares.patrimonio.transferePatrimonio.TransferePatrimonio;
import br.dev.joaosoares.patrimonio.transferePatrimonio.TransferePatrimonioDTO;
import br.dev.joaosoares.patrimonio.transferePatrimonio.TransferePatrimonioRepository;
import br.dev.joaosoares.patrimonio.transferePatrimonio.TransferePatrimonioService;

import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

/**
 * Classe de testes unitários para a classe TransferePatrimonioService.
 * Cobre os métodos do serviço, simulando o comportamento do repositório e
 * verificando se as respostas e exceções são tratadas corretamente.
 */
public class TransferePatrimonioServiceTests {

    @InjectMocks
    private TransferePatrimonioService service;

    @Mock
    private TransferePatrimonioRepository repository;

    private Long idExistente;
    private Long idInexistente;
    private String plaquetaExistente;
    private String plaquetaInexistente;
    private Date startDate;
    private Date endDate;
    private TransferePatrimonio transferePatrimonio;
    private TransferePatrimonioDTO transferePatrimonioDTO;

    /**
     * Configuração inicial antes de cada teste.
     * Inicializa os mocks, os dados de teste e o comportamento simulado do repositório.
     */
    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        idExistente = 1L;
        idInexistente = 100L;
        plaquetaExistente = "AA0123";
        plaquetaInexistente = "ZZ9999";
        startDate = new Date();
        endDate = new Date();
        transferePatrimonio = Factory.createTransferePatrimonio();
        transferePatrimonioDTO = Factory.createTransferePatrimonioDTO();

        // Configurando o comportamento do repositório para findById
        when(repository.findById(idExistente)).thenReturn(Optional.of(transferePatrimonio));
        when(repository.findById(idInexistente)).thenReturn(Optional.empty());

        // Configurando o comportamento do repositório para findAll
        when(repository.findAll()).thenReturn(Arrays.asList(transferePatrimonio));

        // Configurando o comportamento do repositório para findByPlaqueta
        when(repository.findByPlaqueta(plaquetaExistente)).thenReturn(Arrays.asList(transferePatrimonio));
        when(repository.findByPlaqueta(plaquetaInexistente)).thenReturn(Arrays.asList());

        // Configurando o comportamento do repositório para findByDataHoraModificacaoBetween
        when(repository.findByDataHoraModificacaoBetween(startDate, endDate))
                .thenReturn(Arrays.asList(transferePatrimonio));

        // Configurando o comportamento do repositório para findByPlaquetaDataHoraModificacao
        when(repository.findByPlaquetaDataHoraModificacao(plaquetaExistente, startDate, endDate))
                .thenReturn(Arrays.asList(transferePatrimonio));
        when(repository.findByPlaquetaDataHoraModificacao(plaquetaInexistente, startDate, endDate))
                .thenReturn(Arrays.asList());
    }

    /**
     * Testa o método findAll do serviço, verificando se retorna uma lista de TransferePatrimonioDTO.
     */
    @Test
    void findAllDeveriaRetornarListaDeTransferePatrimonioDTO() {
        List<TransferePatrimonioDTO> resultado = service.findAll();
        assertEquals(1, resultado.size());
        Assertions.assertNotNull(resultado);
    }

    /**
     * Testa o método findById do serviço, verificando se retorna um TransferePatrimonioDTO
     * ao buscar por um ID existente.
     */
    @Test
    void findByIdDeveriaRetornarTransferePatrimonioDTOQuandoIdExistir() {
        TransferePatrimonioDTO resultado = service.findById(idExistente);
        assertEquals(transferePatrimonioDTO.getPlaqueta(), resultado.getPlaqueta());
    }

    /**
     * Testa o método findById do serviço, verificando se lança uma NoSuchElementException
     * ao buscar por um ID inexistente.
     */
    @Test
    void findByIdDeveriaLancarNoSuchElementExceptionQuandoIdNaoExistir() {
        assertThrows(NoSuchElementException.class, () -> {
            service.findById(idInexistente);
        });
    }

    /**
     * Testa o método findByPlaqueta do serviço, verificando se retorna uma lista de TransferePatrimonioDTO
     * ao buscar por uma plaqueta existente.
     */
    @Test
    void findByPlaquetaDeveriaRetornarListaDeTransferePatrimonioDTOQuandoPlaquetaExistir() {
        List<TransferePatrimonioDTO> resultado = service.findByPlaqueta(plaquetaExistente);
        assertEquals(1, resultado.size());
        assertEquals(transferePatrimonioDTO.getPlaqueta(), resultado.get(0).getPlaqueta());
    }

    /**
     * Testa o método findByPlaqueta do serviço, verificando se retorna uma lista vazia
     * ao buscar por uma plaqueta inexistente.
     */
    @Test
    void findByPlaquetaDeveriaRetornarListaVaziaQuandoPlaquetaNaoExistir() {
        List<TransferePatrimonioDTO> resultado = service.findByPlaqueta(plaquetaInexistente);
        assertEquals(0, resultado.size());
    }

    /**
     * Testa o método findByDataHoraModificacaoBetween do serviço, verificando se retorna uma lista
     * de TransferePatrimonioDTO ao buscar por uma data entre um intervalo existente.
     */
    @Test
    void findByDataHoraModificacaoBetweenDeveriaRetornarListaDeTransferePatrimonioDTO() {
        List<TransferePatrimonioDTO> resultado = service.findByDataHoraModificacaoBetween(startDate, endDate);
        
        assertEquals(1, resultado.size());  // Verifica se a lista tem exatamente um item
        assertEquals(transferePatrimonioDTO.getPlaqueta(), resultado.get(0).getPlaqueta()); 
    }


    /**
     * Testa o método findByPlaquetaDataHoraModificacao do serviço, verificando se retorna uma lista
     * de TransferePatrimonioDTO ao buscar por uma plaqueta e data entre um intervalo existente.
     */
    @Test
    void findByPlaquetaDataHoraModificacaoDeveriaRetornarListaDeTransferePatrimonioDTOQuandoPlaquetaExistir() {
        List<TransferePatrimonioDTO> resultado = service.findByPlaquetaDataHoraModificacao(plaquetaExistente, startDate, endDate);
        assertEquals(1, resultado.size());
        assertEquals(transferePatrimonioDTO.getPlaqueta(), resultado.get(0).getPlaqueta());
    }

    /**
     * Testa o método findByPlaquetaDataHoraModificacao do serviço, verificando se retorna uma lista vazia
     * ao buscar por uma plaqueta inexistente e data entre um intervalo existente.
     */
    @Test
    void findByPlaquetaDataHoraModificacaoDeveriaRetornarListaVaziaQuandoPlaquetaNaoExistir() {
        List<TransferePatrimonioDTO> resultado = service.findByPlaquetaDataHoraModificacao(plaquetaInexistente, startDate, endDate);
        assertEquals(0, resultado.size());
    }
}
