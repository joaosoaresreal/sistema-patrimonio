package br.com.js.patrimonio.transferePatrimonio;

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

    // LISTAR POR DEPTO
    @Transactional(readOnly = true)
    public List<TransferePatrimonioDTO> findByPlaqueta(String plaqueta) {
        List<TransferePatrimonio> lista = repository.findByPlaqueta(plaqueta);
        return lista.stream().map(x -> new TransferePatrimonioDTO(x)).collect(Collectors.toList());
    }
}
