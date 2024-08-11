package br.dev.joaosoares.patrimonio.usuario;

import br.dev.joaosoares.patrimonio.role.RoleDTO;
import br.dev.joaosoares.patrimonio.role.RoleRepository;
import br.dev.joaosoares.patrimonio.role.Role;
import br.dev.joaosoares.patrimonio.services.exceptions.ResourcesNotFoundException;

import jakarta.persistence.EntityNotFoundException;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
public class UsuarioService {

	@Autowired
	private UsuarioRepository repository;

	@Autowired
	private RoleRepository roleRepository;

	@Autowired
	private BCryptPasswordEncoder passwordEncoder;

    @Value("${file.upload-dir}")
    private String uploadDir;

	// LISTAR
	@Transactional(readOnly = true)
	public List<UsuarioDTO> findAll() {
		List<Usuario> lista = repository.findAll();
		return lista.stream().map(x -> new UsuarioDTO(x)).collect(Collectors.toList());
	}

	// BUSCAR POR ID
	@Transactional(readOnly = true)
	public UsuarioDTO findById(Long id) {
		Optional<Usuario> objeto = repository.findById(id);
		Usuario entity = objeto.get();
		return new UsuarioDTO(entity);
	}

	// INSERIR
	@Transactional
	public UsuarioDTO insert(UsuarioInsertDTO dto) {
		Usuario entity = new Usuario();
		copiarDTOparaEntidade(dto, entity);

		entity.setSenha(passwordEncoder.encode(dto.getSenha()));

		entity = repository.save(entity);

		return new UsuarioDTO(entity);
	}

	// ATUALIZAR
	@Transactional
	public UsuarioDTO update(Long id, UsuarioDTO dto, MultipartFile file) {
		try {
			Usuario entity = repository.getReferenceById(id);
			copiarDTOparaEntidade(dto, entity);

			// Processa o arquivo se não for nulo
			if (file != null && !file.isEmpty()) {
		        try {
		            String fileName = saveFile(file); // Salva o arquivo e obtém o nome
		            entity.setFoto(fileName); // Atualiza a entidade com o nome do arquivo
		        } catch (IOException e) {
		            throw new RuntimeException("Erro ao salvar o arquivo", e);
		        }
			}

			entity = repository.save(entity);
			return new UsuarioDTO(entity);

		} catch (EntityNotFoundException e) {
			throw new ResourcesNotFoundException("O ID não foi encontrado");
		}
	}

	// EXCLUIR
	public void delete(Long id) {
		try {
			repository.deleteById(id);
		} catch (EmptyResultDataAccessException e) {
			throw new ResourcesNotFoundException("O recurso com o ID solicitado não foi localizado");
		}
	}

	private void copiarDTOparaEntidade(UsuarioDTO dto, Usuario entity) {
		entity.setNome(dto.getNome());
		entity.setCpf(dto.getCpf());
		entity.setTelefone(dto.getTelefone());
		entity.setFoto(dto.getFoto());
		entity.setEmail(dto.getEmail());
		entity.setDepartamento(dto.getDepartamento());

		entity.getRoles().clear();
		for (RoleDTO roleDTO : dto.getRoles()) {
			Role role = roleRepository.getReferenceById(roleDTO.getId());
		}
	}

	// Método para salvar o arquivo e obter o nome
	private String saveFile(MultipartFile file) throws IOException {
	    // Gera um nome único para o arquivo
	    String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
	    
	    // Cria o arquivo no diretório especificado
	    File targetFile = new File(uploadDir + File.separator + fileName);
	    
	    // Verifica se o diretório existe, se não, cria-o
	    File parentDir = targetFile.getParentFile();
	    if (!parentDir.exists()) {
	        parentDir.mkdirs();
	    }
	    
	    // Salva o arquivo
	    file.transferTo(targetFile);
	    
	    // Retorna o nome do arquivo
	    return fileName;
	}


	// ======================== Query Methods ==================================
	// BUSCAR POR CPF
	public UsuarioDTO findByCpf(String cpf) {
		Usuario obj = repository.findByCpf(cpf);
		return new UsuarioDTO(obj);
	}

	public UsuarioDTO findByEmail(String email) {
		Usuario obj = repository.findByEmail(email);
		return new UsuarioDTO(obj);
	}

}
