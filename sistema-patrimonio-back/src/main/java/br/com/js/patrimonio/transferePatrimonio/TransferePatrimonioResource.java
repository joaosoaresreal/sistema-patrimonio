package br.com.js.patrimonio.transferePatrimonio;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.js.patrimonio.departamento.Departamento;
import br.com.js.patrimonio.patrimonio.Patrimonio;
import br.com.js.patrimonio.patrimonio.PatrimonioDTO;

@RestController
@RequestMapping(value = "/api_alteracao-patrimonio")
public class TransferePatrimonioResource {

    @Autowired
    private TransferePatrimonioService service;

    // LISTAR
    @GetMapping
    public ResponseEntity<List<TransferePatrimonioDTO>> findAll() {
        List<TransferePatrimonioDTO> list = service.findAll();
        return ResponseEntity.ok().body(list);
    }

    // LISTAR POR PATRIMONIO
    @GetMapping(value = "/patrimonio/{patrimonio}")
    public ResponseEntity<List<TransferePatrimonioDTO>> findByPatrimonio(@PathVariable Patrimonio patrimonio){
        List<TransferePatrimonioDTO> lista = service.findByPatrimonio(patrimonio);
        return ResponseEntity.ok().body(lista);
    }
}
