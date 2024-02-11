package br.com.js.patrimonio.transferePatrimonio;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TransferePatrimonioService {

    @Autowired
    private TransferePatrimonioRepository repository;

    // LISTAR
    @Transactional(readOnly = true)
    public List<TransferePatrimonioDTO> findAll() {
        List<TransferePatrimonio> lista = repository.findAll();
        return lista.stream().map(x -> new TransferePatrimonioDTO(x)).collect(Collectors.toList());
    }
    
    // BUSCAR POR 'ID'
    @Transactional(readOnly = true)
    public TransferePatrimonioDTO findById(Long id) {
        Optional<TransferePatrimonio> objeto = repository.findById(id);
        TransferePatrimonio entity = objeto.get();
        return new TransferePatrimonioDTO(entity);
    }

    // LISTAR POR PLAQUETA
    @Transactional(readOnly = true)
    public List<TransferePatrimonioDTO> findByPlaqueta(String plaqueta) {
        List<TransferePatrimonio> lista = repository.findByPlaqueta(plaqueta);
        return lista.stream().map(x -> new TransferePatrimonioDTO(x)).collect(Collectors.toList());
    }

    // LISTAR POR DATA
    @Transactional(readOnly = true)
    public List<TransferePatrimonioDTO> findByDataHoraModificacaoBetween(Date startDate, Date endDate) {
        List<TransferePatrimonio> lista = repository.findByDataHoraModificacaoBetween(startDate, endDate);
        return lista.stream().map(x -> new TransferePatrimonioDTO(x)).collect(Collectors.toList());
    }

    // LISTAR POR PLAQUETA E DATA
    @Transactional(readOnly = true)
    public List<TransferePatrimonioDTO> findByPlaquetaDataHoraModificacao(String plaqueta, Date startDate, Date endDate) {
        List<TransferePatrimonio> lista = repository.findByPlaquetaDataHoraModificacao(plaqueta, startDate, endDate);
        return lista.stream().map(x -> new TransferePatrimonioDTO(x)).collect(Collectors.toList());
    }
}
