package br.com.js.patrimonio.usuario;

import br.com.js.patrimonio.services.exceptions.ResourcesNotFoundException;
import jakarta.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository repository;

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
    public UsuarioDTO insert(UsuarioDTO dto) {
        Usuario entity = new Usuario();
        entity.setNome(dto.getNome());
        entity.setCpf(dto.getCpf());
        entity.setTelefone(dto.getTelefone());
        entity.setFoto(dto.getFoto());
        entity.setEmail(dto.getEmail());
        entity.setSenha(dto.getSenha());
        
        entity = repository.save(entity);
        
        return new UsuarioDTO(entity);
    }

    // ATUALIZAR
    @Transactional
    public UsuarioDTO update(Long id, UsuarioDTO dto) {
        try {
            Usuario entity = repository.getReferenceById(id);
            entity.setNome(dto.getNome());
            entity.setCpf(dto.getCpf());
            entity.setTelefone(dto.getTelefone());
            entity.setFoto(dto.getFoto());
            entity.setEmail(dto.getEmail());
            entity.setSenha(dto.getSenha());
            
            entity = repository.save(entity);
            
            return new UsuarioDTO(entity);
            
        } catch (EntityNotFoundException e) {
            throw new ResourcesNotFoundException("O ID não foi encontrado");
        }
    }
    
    // EXCLUIR
    public void delete(Long id){
    try {
            repository.deleteById(id);
        } catch (EmptyResultDataAccessException e) {
            throw new ResourcesNotFoundException("O recurso com o ID solicitado não foi localizado");
        }
    }
    
    
}
