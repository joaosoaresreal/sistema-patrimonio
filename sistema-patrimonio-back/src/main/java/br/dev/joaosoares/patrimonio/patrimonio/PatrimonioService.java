package br.dev.joaosoares.patrimonio.patrimonio;

import br.dev.joaosoares.patrimonio.baixaPatrimonio.BaixaPatrimonio;
import br.dev.joaosoares.patrimonio.baixaPatrimonio.BaixaPatrimonioDTO;
import br.dev.joaosoares.patrimonio.baixaPatrimonio.BaixaPatrimonioRepository;
import br.dev.joaosoares.patrimonio.departamento.Departamento;
import br.dev.joaosoares.patrimonio.departamento.DepartamentoRepository;
import br.dev.joaosoares.patrimonio.enums.Status;
import br.dev.joaosoares.patrimonio.services.exceptions.ResourcesNotFoundException;
import br.dev.joaosoares.patrimonio.transferePatrimonio.TransferePatrimonio;
import br.dev.joaosoares.patrimonio.transferePatrimonio.TransferePatrimonioRepository;

import jakarta.persistence.EntityNotFoundException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
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

    @Autowired
    private BaixaPatrimonioRepository baixaPatrimonioRepository;

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
    @Transactional
    public PatrimonioDTO transferencia(Long id, Long departamentoId) {
        try {
            Patrimonio entity = repository.getReferenceById(id);
            var departamento = departamentoRepository.findById(departamentoId);

            TransferePatrimonio transferePatrimonio = new TransferePatrimonio();

            transferePatrimonio.setPatrimonio(entity);
            transferePatrimonio.setEstado(entity.getEstado());
            transferePatrimonio.setDeptoAnterior(entity.getDepartamento().nome);
            transferePatrimonio.setDeptoTransferencia(departamento.get());
            transferePatrimonio.setLocalAnterior(entity.getLocalizacao());
            transferePatrimonio.setObsAnterior(entity.getObservacao());
            transferePatrimonio.setPlaqueta(entity.getPlaqueta());
            transferePatrimonio.setDataHoraModificacao(LocalDateTime.now());
            transferePatrimonio.setUsuarioTransferencia(null);

            transferePatrimonioRepository.save(transferePatrimonio);

            entity.setDepartamento(departamento.get());
            entity = repository.save(entity);

            return new PatrimonioDTO(entity);

        } catch (EntityNotFoundException e) {
            throw new ResourcesNotFoundException("O ID não foi encontrado");
        }
    }

    // BAIXA (VAI MUDAR O STATUS PARA BAIXADO)
    @Transactional
    public PatrimonioDTO baixa(Long id, BaixaPatrimonioDTO dto) {
    	try {
    		Patrimonio entity = repository.getReferenceById(id);

    		BaixaPatrimonio baixaPatrimonio = new BaixaPatrimonio();

    		baixaPatrimonio.setPatrimonio(entity);
    		baixaPatrimonio.setPlaqueta(entity.getPlaqueta());
    		baixaPatrimonio.setDescricao(entity.getDescricao());
    		baixaPatrimonio.setMotivo(dto.getMotivo());
    		baixaPatrimonio.setNomeProfissionalBaixa(dto.getNomeProfissionalBaixa());
    		baixaPatrimonio.setCpfProfissionalBaixa(dto.getCpfProfissionalBaixa());
    		baixaPatrimonio.setDataBaixa(LocalDateTime.now());
    		baixaPatrimonio.setUsuarioBaixa(dto.getUsuarioBaixa());

    		entity.setStatus(Status.BAIXADO);

    		baixaPatrimonioRepository.save(baixaPatrimonio);

    		entity = repository.save(entity);
    		return new PatrimonioDTO(entity);
    	}  catch (EntityNotFoundException e) {
            throw new ResourcesNotFoundException("O ID não foi encontrado");
        }
    }

//    // EXCLUIR
//    public void delete(Long id) {
//        try {
//            repository.deleteById(id);
//        } catch (EmptyResultDataAccessException e) {
//            throw new ResourcesNotFoundException("O recurso com o ID solicitado não foi localizado");
//        }
//    }

    private void copiarDTOparaEntidade(PatrimonioDTO dto, Patrimonio entity) {
        entity.setPlaqueta(dto.getPlaqueta());
        entity.setDescricao(dto.getDescricao());
        entity.setEstado(dto.getEstado());
        entity.setStatus(Status.ATIVO);
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
