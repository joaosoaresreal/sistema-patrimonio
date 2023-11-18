package br.com.js.patrimonio.transferePatrimonio;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.js.patrimonio.departamento.Departamento;
import br.com.js.patrimonio.patrimonio.Patrimonio;
import br.com.js.patrimonio.patrimonio.PatrimonioDTO;

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

    // LISTAR POR DEPTO
    @Transactional(readOnly = true)
    public List<TransferePatrimonioDTO> findByPatrimonio(Patrimonio patrimonio) {
        List<TransferePatrimonio> lista = repository.findByPatrimonio(patrimonio);
        return lista.stream().map(x -> new TransferePatrimonioDTO(x)).collect(Collectors.toList());
    }
}
