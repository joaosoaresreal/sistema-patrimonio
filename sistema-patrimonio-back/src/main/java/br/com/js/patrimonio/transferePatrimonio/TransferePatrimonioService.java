package br.com.js.patrimonio.transferePatrimonio;

import java.util.List;
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
}
