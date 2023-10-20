package br.com.js.patrimonio.empresa;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.js.patrimonio.empresa.EmpresaDTO;
import br.com.js.patrimonio.services.exceptions.ResourcesNotFoundException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.dao.EmptyResultDataAccessException;

@Service
public class EmpresaService {

    @Autowired
    private EmpresaRepository repository;

    // LISTAR
    @Transactional(readOnly = true)
    public List<EmpresaDTO> findAll() {
        List<Empresa> lista = repository.findAll();
        return lista.stream().map(x -> new EmpresaDTO(x)).collect(Collectors.toList());
    }

    // BUSCAR POR 'ID'
    @Transactional(readOnly = true)
    public EmpresaDTO findById(Long id) {
        Optional<Empresa> objeto = repository.findById(id);
        Empresa entity = objeto.get();
        return new EmpresaDTO(entity);
    }

    // INSERIR
    @Transactional
    public EmpresaDTO insert(EmpresaDTO dto) {
        Empresa entity = new Empresa();
        copiarDTOparaEntidade(dto, entity);

        entity = repository.save(entity);

        return new EmpresaDTO(entity);
    }

    // ATUALIZAR
    @Transactional
    public EmpresaDTO update(Long id, EmpresaDTO dto) {
        try {
            Empresa entity = repository.getReferenceById(id);
            copiarDTOparaEntidade(dto, entity);

            entity = repository.save(entity);

            return new EmpresaDTO(entity);
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

    private void copiarDTOparaEntidade(EmpresaDTO dto, Empresa entity) {
        entity.setCnpj(dto.getCnpj());
        entity.setNomeFantasia(dto.getNomeFantasia());
        entity.setTelefone(dto.getTelefone());
        entity.setEmail(dto.getEmail());
        entity.setEndereco(dto.getEndereco());
    }
}
