package br.dev.joaosoares.patrimonio.sistemapatrimonio.tests;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import br.dev.joaosoares.patrimonio.baixaPatrimonio.BaixaPatrimonio;
import br.dev.joaosoares.patrimonio.baixaPatrimonio.BaixaPatrimonioDTO;
import br.dev.joaosoares.patrimonio.departamento.Departamento;
import br.dev.joaosoares.patrimonio.departamento.DepartamentoDTO;
import br.dev.joaosoares.patrimonio.empresa.Empresa;
import br.dev.joaosoares.patrimonio.empresa.EmpresaDTO;
import br.dev.joaosoares.patrimonio.enums.EstadoConservacao;
import br.dev.joaosoares.patrimonio.enums.Status;
import br.dev.joaosoares.patrimonio.patrimonio.Patrimonio;
import br.dev.joaosoares.patrimonio.patrimonio.PatrimonioDTO;
import br.dev.joaosoares.patrimonio.role.Role;
import br.dev.joaosoares.patrimonio.transferePatrimonio.TransferePatrimonio;
import br.dev.joaosoares.patrimonio.transferePatrimonio.TransferePatrimonioDTO;
import br.dev.joaosoares.patrimonio.usuario.Usuario;
import br.dev.joaosoares.patrimonio.usuario.UsuarioDTO;
import br.dev.joaosoares.patrimonio.usuario.UsuarioInsertDTO;

public class Factory {
    /**
     * Cria uma instância de {@link Empresa} com dados de exemplo.
     * 
     * @return Uma instância de {@link Empresa}.
     */
    public static Empresa createEmpresa() {
        Empresa empresa = new Empresa();
        empresa.setId(1L);
        empresa.setCnpj("12345678000195");
        empresa.setNomeFantasia("Empresa Teste");
        empresa.setTelefone("0123456789");
        empresa.setEmail("contato@empresa.com");
        empresa.setEndereco("Rua Teste, 123 - Centro");
        return empresa;
    }

    /**
     * Cria uma instância de {@link EmpresaDTO} com dados de exemplo.
     * 
     * @return Uma instância de {@link EmpresaDTO}.
     */
    public static EmpresaDTO createEmpresaDTO() {
        // Configuração do DTO usando um construtor ou método apropriado
        Empresa empresa = createEmpresa();
        return new EmpresaDTO(empresa.getId(), empresa.getCnpj(), empresa.getNomeFantasia(),
                empresa.getTelefone(), empresa.getEmail(), empresa.getEndereco());
    }

    /**
     * Cria uma instância de `Departamento` com valores padrão.
     *
     * @return Um objeto `Departamento` com atributos preenchidos com dados de teste.
     */
    public static Departamento createDepartamento() {
        return Departamento.builder()
                .id(1L) // ID do departamento
                .nome("Departamento Teste") // Nome do departamento
                .telefone("0123456789") // Telefone do departamento
                .email("teste@empresa.com") // Email do departamento
                .endereco("Rua Teste, 123 - Centro") // Endereço do departamento
                .empresa(createEmpresa()) // Associação com uma empresa
                .build();
    }

    /**
     * Cria uma instância de `DepartamentoDTO` com valores baseados em um `Departamento` criado por `createDepartamento()`.
     *
     * @return Um objeto `DepartamentoDTO` com atributos preenchidos com dados de teste.
     */
    public static DepartamentoDTO createDepartamentoDTO() {
        return new DepartamentoDTO(createDepartamento());
    }

    /**
     * Cria uma instância de {@link Usuario} com dados de exemplo.
     * 
     * @return Uma instância de {@link Usuario} com atributos preenchidos com dados de teste.
     */
    public static Usuario createUsuario() {
        Usuario usuario = new Usuario();
        usuario.setId(1L);
        usuario.setNome("João Mendes da Silva");
        usuario.setNickName("Joao Silva");
        usuario.setCpf("123.456.789-00");
        usuario.setTelefone("(00) 12345-6789");
        usuario.setFoto("foto.png");
        usuario.setEmail("joao.silva@email.com");
        usuario.setSenha("12345678");

        // Cria um conjunto de roles de exemplo
        Set<Role> roles = new HashSet<>();
        roles.add(new Role(1L, "ROLE_ADMIN"));
        usuario.setRoles(roles);

        usuario.setDepartamento(createDepartamento());

        return usuario;
    }

    /**
     * Cria uma instância de `UsuarioDTO` com valores baseados em um `Usuario` criado por `createUsuario()`.
     *
     * @return Um objeto `UsuarioDTO` com atributos preenchidos com dados de teste.
     */
    public static UsuarioDTO createUsuarioDTO() {
        return new UsuarioDTO(createUsuario());
    }

    /**
     * Cria uma instância de {@link UsuarioInsertDTO} com dados de exemplo.
     *
     * @return Uma instância de {@link UsuarioInsertDTO}.
     */
    public static UsuarioInsertDTO createUsuarioInsertDTO() {
        UsuarioInsertDTO dto = new UsuarioInsertDTO();
        dto.setSenha("12345678");

        return dto;
    }

    /**
     * Cria uma instância de Patrimonio com dados padrão para testes.
     * 
     * @return Uma instância de Patrimonio com atributos preenchidos.
     */
    public static Patrimonio createPatrimonio() {
        return Patrimonio.builder()
                .id(1L)
                .plaqueta("AA0123")
                .descricao("Patrimônio de teste")
                .estado(EstadoConservacao.BOM)
                .status(Status.ATIVO)
                .localizacao("Sala 101")
                .dataEntrada(LocalDate.now())
                .observacao("Observação de teste")
                .departamento(createDepartamento())
                .build();
    }

    /**
     * Cria uma instância de PatrimonioDTO com dados padrão para testes.
     * 
     * @return Uma instância de PatrimonioDTO com atributos preenchidos.
     */
    public static PatrimonioDTO createPatrimonioDTO() {
        return new PatrimonioDTO(createPatrimonio());
    }

    /**
     * Cria uma instância de TransferePatrimonio com dados padrão para testes.
     *
     * @return Uma instância de TransferePatrimonio com atributos preenchidos.
     */
    public static TransferePatrimonio createTransferePatrimonio() {
        return TransferePatrimonio.builder()
                .id(1L)
                .plaqueta("AA0123")
                .estado(EstadoConservacao.BOM)
                .localAnterior("Local A")
                .obsAnterior("Observação A")
                .deptoAnterior("Departamento E")
                .dataHoraModificacao(LocalDateTime.now())
                .deptoTransferencia(createDepartamento())
                .patrimonio(createPatrimonio())
                .usuarioTransferencia(createUsuario())
                .build();
    }

    /**
     * Cria uma instância de TransferePatrimonioDTO a partir de uma instância de TransferePatrimonio.
     *
     * @return Uma instância de TransferePatrimonioDTO com dados padrão.
     */
    public static TransferePatrimonioDTO createTransferePatrimonioDTO() {
        TransferePatrimonio transferePatrimonio = createTransferePatrimonio();
        return new TransferePatrimonioDTO(transferePatrimonio);
    }

    /**
     * Cria uma instância de {@link BaixaPatrimonio} com dados de exemplo.
     * 
     * @return Uma instância de {@link BaixaPatrimonio}.
     */
    public static BaixaPatrimonio createBaixaPatrimonio() {
        return BaixaPatrimonio.builder()
                .id(1L)
                .plaqueta("AA1234")
                .descricao("Descrição do Patrimonio")
                .motivo("Motivo da baixa")
                .nomeProfissionalBaixa("Profissional Teste")
                .cpfProfissionalBaixa("123.456.789-00")
                .dataBaixa(LocalDateTime.now())
                .usuarioBaixa(createUsuario())
                .patrimonio(createPatrimonio())
                .build();
    }

    /**
     * Cria uma instância de {@link BaixaPatrimonioDTO} com dados de exemplo.
     * 
     * @return Uma instância de {@link BaixaPatrimonioDTO}.
     */
    public static BaixaPatrimonioDTO createBaixaPatrimonioDTO() {
        return new BaixaPatrimonioDTO(createBaixaPatrimonio());
    }

}
