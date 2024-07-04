package br.dev.joaosoares.patrimonio.patrimonio;

import br.dev.joaosoares.patrimonio.baixaPatrimonio.BaixaPatrimonioDTO;
import br.dev.joaosoares.patrimonio.departamento.Departamento;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
@RequestMapping(value = "/api_patrimonio")
public class PatrimonioResource {

    @Autowired
    private PatrimonioService service;

    // LISTAR
    @GetMapping
    public ResponseEntity<List<PatrimonioDTO>> findAll() {
        List<PatrimonioDTO> list = service.findAll();
        return ResponseEntity.ok().body(list);
    }
    
    // BUSCAR POR 'ID'
    @GetMapping(value = "/{id}")
    public ResponseEntity<PatrimonioDTO>findById(@PathVariable Long id) {
        PatrimonioDTO dto = service.findById(id);
        return ResponseEntity.ok().body(dto);
    }
    
    // INSERIR REGISTRO
    @PostMapping
    public ResponseEntity<PatrimonioDTO> insert(@RequestBody PatrimonioDTO dto){
        dto = service.insert(dto);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(dto.getId()).toUri();
        return ResponseEntity.created(uri).body(null);
    }
    
    // ATUALIZAR REGISTRO
    @PutMapping(value = "/{id}")
    public ResponseEntity<PatrimonioDTO> update(@PathVariable long id, @RequestBody PatrimonioDTO dto){
        dto = service.update(id, dto);
        return ResponseEntity.ok().body(dto);
    }

    // TRANSFERENCIA PATRIMONIAL
    @PutMapping(value = "/transferencia/{id}/{departamentoId}")
    public ResponseEntity<PatrimonioDTO> transferencia(@PathVariable long id, @PathVariable long departamentoId){
        var dto = service.transferencia(id, departamentoId);
        return ResponseEntity.ok().body(dto);
    }

    // BAIXA PATRIMONIAL
    @PutMapping(value = "/baixa/{id}")
    public ResponseEntity<PatrimonioDTO> baixa(@PathVariable long id, @RequestBody BaixaPatrimonioDTO dto){
    	var baixa = service.baixa(id, dto);
        return ResponseEntity.ok().body(baixa);
    }

//    // EXCLUIR REGISTRO
//    @DeleteMapping(value = "/{id}")
//    public ResponseEntity<Void> delete(@PathVariable Long id) {
//        service.delete(id);
//        return ResponseEntity.noContent().build();
//    }

    // ======================== Query Methods ==================================
    // BUSCAR POR Nº PLAQUETA
    @GetMapping(value = "/plaqueta/{plaqueta}")
    public ResponseEntity<PatrimonioDTO> findByPlaqueta(@PathVariable String plaqueta){
        PatrimonioDTO dto = service.findByPlaqueta(plaqueta);
        return ResponseEntity.ok().body(dto);
    }

    // LISTAR ATIVOS POR DEPTO
    @GetMapping(value = "/ativos/{departamento}")
    public ResponseEntity<List<PatrimonioDTO>> findAtivosByDepartamento(@PathVariable Departamento departamento){
        List<PatrimonioDTO> lista = service.findAtivosByDepartamento(departamento);
        return ResponseEntity.ok().body(lista);
    }

    // LISTAR PATRIMONIOS ATIVOS
    @GetMapping("/ativos")
    public ResponseEntity<List<PatrimonioDTO>> findByAtivos() {
        List<PatrimonioDTO> list = service.findByAtivos();
        return ResponseEntity.ok().body(list);
    }
}
