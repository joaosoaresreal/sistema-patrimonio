package br.com.js.patrimonio.patrimonio;

import br.com.js.patrimonio.departamento.Departamento;
import br.com.js.patrimonio.departamento.DepartamentoRepository;
import br.com.js.patrimonio.services.exceptions.ResourcesNotFoundException;
import br.com.js.patrimonio.transferePatrimonio.TransferePatrimonio;
import br.com.js.patrimonio.transferePatrimonio.TransferePatrimonioRepository;

import jakarta.persistence.EntityNotFoundException;

import java.time.LocalDateTime;
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

    @Autowired
    private DepartamentoRepository departamentoRepository;

    @Autowired
    private TransferePatrimonioRepository transferePatrimonioRepository;

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
        copiarDTOparaEntidade(dto, entity);

        entity = repository.save(entity);

        return new PatrimonioDTO(entity);
    }

    // ATUALIZAR
    @Transactional
    public PatrimonioDTO update(Long id, PatrimonioDTO dto) {
        try {
            Patrimonio entity = repository.getReferenceById(id);

            // Copia os novos dados para a entidade
            copiarDTOparaEntidade(dto, entity);

            // Salva a entidade atualizada
            entity = repository.save(entity);

            return new PatrimonioDTO(entity);

        } catch (EntityNotFoundException e) {
            throw new ResourcesNotFoundException("O ID não foi encontrado");
        }
    }

    // TRANSFERENCIA (SÓ ATUALIZA O DPTO)
    @Transactional(readOnly = true)
    public PatrimonioDTO transferencia(Long id, Long departamentoId) {
        try {
            Patrimonio entity = repository.getReferenceById(id);
            Departamento departamento = departamentoRepository.getReferenceById(departamentoId);

            TransferePatrimonio transferePatrimonio = new TransferePatrimonio();

            transferePatrimonio.setPatrimonio(entity);
            transferePatrimonio.setDeptoAnterior(entity.getDepartamento());
            transferePatrimonio.setEstadoAnterior(entity.getEstado());
            transferePatrimonio.setDescricaoAnterior(entity.getDescricao());
            transferePatrimonio.setLocalAnterior(entity.getLocalizacao());
            transferePatrimonio.setObsAnterior(entity.getObservacao());
            transferePatrimonio.setPlaqueta(entity.getPlaqueta());
            transferePatrimonio.setDataHoraModificacao(LocalDateTime.now());

            transferePatrimonioRepository.save(transferePatrimonio);

            entity.setDepartamento(departamento);
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

    private void copiarDTOparaEntidade(PatrimonioDTO dto, Patrimonio entity) {
        entity.setPlaqueta(dto.getPlaqueta());
        entity.setDescricao(dto.getDescricao());
        entity.setEstado(dto.getEstado());
        entity.setLocalizacao(dto.getLocalizacao());
        entity.setDataEntrada(dto.getDataEntrada());
        entity.setObservacao(dto.getLocalizacao());
        entity.setDepartamento(dto.getDepartamento());
    }

    // ======================== Query Methods ==================================
    // BUSCAR POR Nº PLAQUETA
    @Transactional(readOnly = true)
    public PatrimonioDTO findByPlaqueta(String plaqueta) {
        Patrimonio obj = repository.findByPlaqueta(plaqueta);
        return new PatrimonioDTO(obj);
    }

    // LISTAR POR DEPTO
    @Transactional(readOnly = true)
    public List<PatrimonioDTO> findByDepartamento(Departamento departamento) {
        List<Patrimonio> lista = repository.findByDepartamento(departamento);
        return lista.stream().map(x -> new PatrimonioDTO(x)).collect(Collectors.toList());
    }

    // *********AUDITORIA DE MODIFICAÇÃO DO PATRIMONIO*********
//    public void auditoria(Long id, PatrimonioDTO dadosAntigos, Patrimonio novoPatrimonio) {
//
//    	if (dadosAntigos != null) {
//    		TransferePatrimonio transferePatrimonio = new TransferePatrimonio();
//
//    		transferePatrimonio.setDeptoAnterior(dadosAntigos.getDepartamento());
//    		transferePatrimonio.setEstadoAnterior(dadosAntigos.getEstado());
//    		transferePatrimonio.setDescricaoAnterior(dadosAntigos.getDescricao());
//    		transferePatrimonio.setLocalAnterior(dadosAntigos.getLocalizacao());
//    		transferePatrimonio.setObsAnterior(dadosAntigos.getObservacao());
//    		transferePatrimonio.setPlaqueta(dadosAntigos.getPlaqueta());
//    		transferePatrimonio.setDataHoraModificacao(LocalDateTime.now());
//
//    		transferePatrimonioRepository.save(transferePatrimonio);
//    	}
//    }
}
