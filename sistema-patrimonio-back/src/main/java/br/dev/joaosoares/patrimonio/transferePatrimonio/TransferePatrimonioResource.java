package br.dev.joaosoares.patrimonio.transferePatrimonio;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.dev.joaosoares.patrimonio.departamento.Departamento;
import br.dev.joaosoares.patrimonio.patrimonio.Patrimonio;
import br.dev.joaosoares.patrimonio.patrimonio.PatrimonioDTO;

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

    // LISTAR POR DATA
    @GetMapping(value = "/data") // /data?startDate=0000-00-00&endDate=0000-00-00
    public ResponseEntity<List<TransferePatrimonioDTO>> findByDataHoraModificacaoBetween(@RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date startDate, @RequestParam("endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date endDate){
        List<TransferePatrimonioDTO> lista = service.findByDataHoraModificacaoBetween(startDate, endDate);
        return ResponseEntity.ok().body(lista);
    }

    // LISTAR POR PLAQUETA E DATA
    @GetMapping(value = "/{plaqueta}/data") // /plaqueta/data?startDate=0000-00-00&endDate=0000-00-00
    public ResponseEntity<List<TransferePatrimonioDTO>> findByPlaquetaDataHoraModificacao(@PathVariable String plaqueta, @RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date startDate, @RequestParam("endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date endDate){
        List<TransferePatrimonioDTO> lista = service.findByPlaquetaDataHoraModificacao(plaqueta, startDate, endDate);
        return ResponseEntity.ok().body(lista);
    }
}
