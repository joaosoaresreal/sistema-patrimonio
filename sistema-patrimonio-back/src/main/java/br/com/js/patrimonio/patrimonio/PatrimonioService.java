package br.com.js.patrimonio.patrimonio;

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
public class PatrimonioService {

    @Autowired
    private PatrimonioRepository repository;

    // LISTAR
    @Transactional(readOnly = true)
    public List<PatrimonioDTO> findAll() {
        List<Patrimonio> lista = repository.findAll();
        return lista.stream().map(x -> new PatrimonioDTO(x)).collect(Collectors.toList());
    }

    // BUSCAR POR 'ID'
    @Transactional(readOnly = true)
    public PatrimonioDTO findById(Long id) {
        Optional<Patrimonio> objeto = repository.findById(id);
        Patrimonio entity = objeto.get();
        return new PatrimonioDTO(entity);
    }

    // INSERIR
    @Transactional
    public PatrimonioDTO insert(PatrimonioDTO dto) {
        Patrimonio entity = new Patrimonio();

        entity.setPlaqueta(dto.getPlaqueta());
        entity.setDescricao(dto.getDescricao());
        entity.setEstado(dto.getEstado());
        entity.setLocalizacao(dto.getLocalizacao());
        entity.setDataEntrada(dto.getDataEntrada());
        entity.setObservacao(dto.getLocalizacao());
        entity.setDepartamento(dto.getDepartamento());

        entity = repository.save(entity);

        return new PatrimonioDTO(entity);

    }

    // ATUALIZAR
    @Transactional
    public PatrimonioDTO update(Long id, PatrimonioDTO dto) {
        try {
            Patrimonio entity = new Patrimonio();

            entity.setPlaqueta(dto.getPlaqueta());
            entity.setDescricao(dto.getDescricao());
            entity.setEstado(dto.getEstado());
            entity.setLocalizacao(dto.getLocalizacao());
            entity.setDataEntrada(dto.getDataEntrada());
            entity.setObservacao(dto.getLocalizacao());
            entity.setDepartamento(dto.getDepartamento());

            entity = repository.save(entity);

            return new PatrimonioDTO(entity);

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
}
