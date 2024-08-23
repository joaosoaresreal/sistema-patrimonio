package br.dev.joaosoares.patrimonio.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import br.dev.joaosoares.patrimonio.baixaPatrimonio.BaixaPatrimonio;
import br.dev.joaosoares.patrimonio.baixaPatrimonio.BaixaPatrimonioDTO;
import br.dev.joaosoares.patrimonio.baixaPatrimonio.BaixaPatrimonioRepository;
import br.dev.joaosoares.patrimonio.baixaPatrimonio.BaixaPatrimonioService;
import br.dev.joaosoares.patrimonio.sistemapatrimonio.tests.Factory;

/**
 * Teste unitário para a classe {@link BaixaPatrimonioService}.
 * 
 * Este teste cobre o método {@link BaixaPatrimonioService#findAll()} que
 * deve retornar uma lista de {@link BaixaPatrimonioDTO} com base nos dados
 * fornecidos pelo repositório mockado.
 */
@ExtendWith(MockitoExtension.class)
public class BaixaPatrimonioServiceTests {

    /**
     * Mock do repositório {@link BaixaPatrimonioRepository}.
     * O Mockito cria uma instância simulada que permite definir o comportamento
     * do método {@link BaixaPatrimonioRepository#findAll()}.
     */
    @Mock
    private BaixaPatrimonioRepository repository;

    /**
     * Instância do serviço {@link BaixaPatrimonioService} que será testada.
     * O Mockito injeta o mock do repositório nesta instância.
     */
    @InjectMocks
    private BaixaPatrimonioService service;

    /**
     * Instância de {@link BaixaPatrimonio} usada para simular os dados retornados
     * pelo repositório no teste.
     */
    private BaixaPatrimonio baixaPatrimonio;

    /**
     * Instância de {@link BaixaPatrimonioDTO} esperada como resultado do método
     * {@link BaixaPatrimonioService#findAll()}.
     */
    private BaixaPatrimonioDTO baixaPatrimonioDTO;

    /**
     * Configura o ambiente de teste. Este método é executado antes de cada teste
     * para garantir que o ambiente esteja pronto com os dados necessários.
     */
    @BeforeEach
    void setUp() {
        // Criação de uma instância de BaixaPatrimonio com dados de exemplo.
        baixaPatrimonio = Factory.createBaixaPatrimonio();

        // Criação de um DTO correspondente com base nos dados acima.
        baixaPatrimonioDTO = Factory.createBaixaPatrimonioDTO();
    }

    /**
     * Testa o método {@link BaixaPatrimonioService#findAll()} para garantir que
     * ele retorna corretamente uma lista de {@link BaixaPatrimonioDTO}.
     * 
     * O teste simula o retorno do método {@link BaixaPatrimonioRepository#findAll()}
     * com uma lista contendo um único {@link BaixaPatrimonio}. O resultado do método
     * {@link BaixaPatrimonioService#findAll()} deve ser uma lista contendo um único
     * {@link BaixaPatrimonioDTO} que corresponde ao DTO esperado.
     */
    @Test
    void findAllDeveriaRetornarListaDeBaixaPatrimonioDTO() {
        // Arrange: Configura o comportamento esperado do repositório mockado.
        // Define que quando repository.findAll() for chamado, deve retornar uma lista contendo baixaPatrimonio.
        when(repository.findAll()).thenReturn(List.of(baixaPatrimonio));

        // Act: Invoca o método findAll do serviço e obtém o resultado.
        List<BaixaPatrimonioDTO> resultado = service.findAll();

        // Assert: Verifica se o resultado contém apenas um elemento e se esse elemento corresponde ao esperado.
        assertEquals(1, resultado.size());
        assertEquals(baixaPatrimonioDTO.getPlaqueta(), resultado.get(0).getPlaqueta());
    }
}
