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

    // BUSCAR POR 'ID'
    @GetMapping(value = "/{id}")
    public ResponseEntity<TransferePatrimonioDTO>findById(@PathVariable Long id) {
        TransferePatrimonioDTO dto = service.findById(id);
        return ResponseEntity.ok().body(dto);
    }

    // LISTAR POR PATRIMONIO
    @GetMapping(value = "/plaqueta/{plaqueta}")
    public ResponseEntity<List<TransferePatrimonioDTO>> findByPlaqueta(@PathVariable String plaqueta){
        List<TransferePatrimonioDTO> lista = service.findByPlaqueta(plaqueta);
        return ResponseEntity.ok().body(lista);
    }
}
