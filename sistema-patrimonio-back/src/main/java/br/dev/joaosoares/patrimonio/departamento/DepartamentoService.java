package br.dev.joaosoares.patrimonio.departamento;

import br.dev.joaosoares.patrimonio.services.exceptions.ResourcesNotFoundException;

import jakarta.persistence.EntityNotFoundException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class DepartamentoService {

    @Autowired
    private DepartamentoRepository repository;

    // LISTAR
    @Transactional(readOnly = true)
    public List<DepartamentoDTO> findAll() {
        List<Departamento> lista = repository.findAll();
        return lista.stream().map(x -> new DepartamentoDTO(x)).collect(Collectors.toList());
    }

    // BUSCAR POR 'ID'
    @Transactional(readOnly = true)
    public DepartamentoDTO findById(long id) {
        Optional<Departamento> objeto = repository.findById(id);
        Departamento entity = objeto.get();
        return new DepartamentoDTO(entity);
    }

    // INSERIR
    @Transactional
    public DepartamentoDTO insert(DepartamentoDTO dto) {
        Departamento entity = new Departamento();
        copiarDTOparaEntidade(dto, entity);

        entity = repository.save(entity);

        return new DepartamentoDTO(entity);
    }

    // ATUALIZAR
    @Transactional
    public DepartamentoDTO update(Long id, DepartamentoDTO dto) {
        try {
            Departamento entity = repository.getReferenceById(id);
            copiarDTOparaEntidade(dto, entity);

            entity = repository.save(entity);

            return new DepartamentoDTO(entity);
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

    private void copiarDTOparaEntidade(DepartamentoDTO dto, Departamento entity) {
        entity.setNome(dto.getNome());
        entity.setTelefone(dto.getTelefone());
        entity.setEmail(dto.getEmail());
        entity.setEndereco(dto.getEndereco());
        entity.setEmpresa(dto.getEmpresa());
    }

    // =================== @Query - Consultas Customizadas =================================
    @Transactional(readOnly = true)
    public List<DepartamentoNomeDTO> findByNomeSQL() {
        return repository.findByNomeSQL();
    }
}
