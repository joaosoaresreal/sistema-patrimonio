package br.dev.joaosoares.patrimonio.services;

import br.dev.joaosoares.patrimonio.usuario.Usuario;
import br.dev.joaosoares.patrimonio.usuario.UsuarioDTO;
import br.dev.joaosoares.patrimonio.usuario.UsuarioInsertDTO;
import br.dev.joaosoares.patrimonio.usuario.UsuarioService;
import jakarta.persistence.EntityNotFoundException;
import br.dev.joaosoares.patrimonio.services.exceptions.ResourcesNotFoundException;
import br.dev.joaosoares.patrimonio.sistemapatrimonio.tests.Factory;
import br.dev.joaosoares.patrimonio.usuario.UsuarioRepository;
import br.dev.joaosoares.patrimonio.role.RoleRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

/**
 * Testes unitários para a classe {@link UsuarioService}.
 * <p>
 * Este teste utiliza JUnit para estruturar os casos de teste e Mockito para simular o comportamento do repositório {@link UsuarioRepository}.
 * </p>
 */
@ExtendWith(MockitoExtension.class)
public class UsuarioServiceTests {

	@InjectMocks
	private UsuarioService service;

	@Mock
	private UsuarioRepository repository;

	@Mock
	private RoleRepository roleRepository;

	@Mock
	private BCryptPasswordEncoder passwordEncoder;

	@Mock
	private MultipartFile file;

	private Usuario usuario;
	private UsuarioDTO usuarioDTO;
	private UsuarioInsertDTO usuarioInsertDTO;

	@BeforeEach
	public void setUp() {
		MockitoAnnotations.openMocks(this);
		usuario = Factory.createUsuario();
		usuarioDTO = Factory.createUsuarioDTO();
		usuarioInsertDTO = Factory.createUsuarioInsertDTO();
	}

	/**
	 * Testa o método `findAll` do serviço. Deve retornar uma lista de
	 * {@link UsuarioDTO} com todos os usuários.
	 */
	@Test
	public void findAllDeveriaRetornarTodosUsuarios() {
		when(repository.findAll()).thenReturn(List.of(usuario));

		List<UsuarioDTO> result = service.findAll();

		assertNotNull(result);
		assertFalse(result.isEmpty());
		assertEquals(1, result.size());
		assertEquals(usuario.getId(), result.get(0).getId());
	}

	/**
	 * Testa o método `findById` do serviço. Deve retornar um {@link UsuarioDTO}
	 * correspondente ao ID fornecido.
	 */
	@Test
	public void findByIdDeveriaRetornarUsuarioQuandoIdExistir() {
		when(repository.findById(anyLong())).thenReturn(Optional.of(usuario));

		UsuarioDTO result = service.findById(usuario.getId());

		assertNotNull(result);
		assertEquals(usuario.getId(), result.getId());
	}

	/**
	 * Testa o método `findById` do serviço. Deve lançar uma exceção
	 * {@link ResourcesNotFoundException} quando o ID não existir.
	 */
	@Test
	public void findByIdDeveriaLancarExcecaoQuandoIdNaoExistir() {
		when(repository.findById(anyLong())).thenReturn(Optional.empty());

		assertThrows(ResourcesNotFoundException.class, () -> {
			service.findById(usuario.getId());
		});
	}

	/**
	 * Testa o método `insert` do serviço. Deve retornar um {@link UsuarioDTO} após
	 * a inserção do usuário.
	 */
	@Test
	public void insertDeveriaRetornarUsuarioDTO() {
		when(repository.save(any(Usuario.class))).thenReturn(usuario);
		when(passwordEncoder.encode(any(String.class))).thenReturn("senhaCodificada");

		UsuarioDTO result = service.insert(usuarioInsertDTO);

		assertNotNull(result);
		assertEquals(usuario.getId(), result.getId());
		assertEquals(usuario.getNome(), result.getNome());
	}

	/**
	 * Testa o método `update` do serviço. Deve retornar um {@link UsuarioDTO} com
	 * os dados atualizados.
	 */
	@Test
	public void updateDeveriaRetornarUsuarioDTOAtualizado() throws IOException {
		// Configuração dos mocks
		when(repository.getReferenceById(anyLong())).thenReturn(usuario);
		when(repository.save(any(Usuario.class))).thenReturn(usuario);
		when(file.isEmpty()).thenReturn(false);
		when(file.getOriginalFilename()).thenReturn("novaFoto.png");

		// Usando doAnswer para definir o comportamento para um método que retorna void
		doAnswer(invocation -> {
			// Não é necessário fazer nada específico para o teste
			return null;
		}).when(file).transferTo(any(File.class));

		// Simular o nome do arquivo gerado pelo método saveFile
		String expectedFileName = System.currentTimeMillis() + "_novaFoto.png";

		// Execução do método que está sendo testado
		UsuarioDTO result = service.update(usuario.getId(), usuarioDTO, file);

        // Verificação dos resultados
        assertNotNull(result);
        assertEquals(usuarioDTO.getNome(), result.getNome());
        assertEquals(usuarioDTO.getNickName(), result.getNickName());
        assertEquals(usuarioDTO.getCpf(), result.getCpf());
        assertEquals(usuarioDTO.getTelefone(), result.getTelefone());
        assertEquals(usuarioDTO.getEmail(), result.getEmail());

        // Verifica se o nome do arquivo termina com "novaFoto.png", pois como usa timeStamp muda muito rapido o nome
        String actualFileName = result.getFoto();
        assertTrue(actualFileName.endsWith("novaFoto.png"), "O nome do arquivo não termina com 'novaFoto.png'");
    }

	/**
	 * Testa o método `update` do serviço. Deve lançar uma exceção
	 * {@link ResourcesNotFoundException} quando o ID do usuário não existir.
	 */
	@Test
	public void updateDeveriaLancarExcecaoQuandoIdNaoExistir() {
		when(repository.getReferenceById(anyLong())).thenThrow(EntityNotFoundException.class);

		assertThrows(ResourcesNotFoundException.class, () -> {
			service.update(usuario.getId(), usuarioDTO, null);
		});
	}

	/**
	 * Testa o método `delete` do serviço. Deve excluir um usuário existente sem
	 * lançar exceção.
	 */
	@Test
	public void deleteDeveriaExcluirUsuarioQuandoIdExistir() {
		doNothing().when(repository).deleteById(anyLong());

		assertDoesNotThrow(() -> {
			service.delete(usuario.getId());
		});
	}

	/**
	 * Testa o método `delete` do serviço. Deve lançar uma exceção
	 * {@link ResourcesNotFoundException} quando tentar excluir um usuário com ID
	 * que não existe.
	 */
	@Test
	public void deleteDeveriaLancarExcecaoQuandoIdNaoExistir() {
		doThrow(EmptyResultDataAccessException.class).when(repository).deleteById(anyLong());

		assertThrows(ResourcesNotFoundException.class, () -> {
			service.delete(usuario.getId());
		});
	}

	/**
	 * Testa o método `findByCpf` do serviço. Deve retornar um {@link UsuarioDTO}
	 * correspondente ao CPF fornecido.
	 */
	@Test
	public void findByCpfDeveriaRetornarUsuarioQuandoCpfExistir() {
		when(repository.findByCpf(any(String.class))).thenReturn(usuario);

		UsuarioDTO result = service.findByCpf(usuario.getCpf());

		assertNotNull(result);
		assertEquals(usuario.getCpf(), result.getCpf());
	}

	/**
	 * Testa o método `findByEmail` do serviço. Deve retornar um {@link UsuarioDTO}
	 * correspondente ao email fornecido.
	 */
	@Test
	public void findByEmailDeveriaRetornarUsuarioQuandoEmailExistir() {
		when(repository.findByEmail(any(String.class))).thenReturn(usuario);

		UsuarioDTO result = service.findByEmail(usuario.getEmail());

		assertNotNull(result);
		assertEquals(usuario.getEmail(), result.getEmail());
	}
}
