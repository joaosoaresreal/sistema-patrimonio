package br.com.js.patrimonio.empresa;

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
@RequestMapping(value = "/api_empresas")
public class EmpresaResource {

    @Autowired
    private EmpresaService service;

    // LISTAR
    @GetMapping
    public ResponseEntity<List<EmpresaDTO>> findAll() {
        List<EmpresaDTO> list = service.findAll();
        return ResponseEntity.ok().body(list);
    }

    // BUSCAR POR 'ID'
    @GetMapping(value = "/{id}")
    public ResponseEntity<EmpresaDTO> findById(@PathVariable Long id) {
        EmpresaDTO dto = service.findById(id);
        return ResponseEntity.ok().body(dto);
    }

    // INSERIR REGISTRO
    @PostMapping
    public ResponseEntity<EmpresaDTO> insert(@RequestBody EmpresaDTO dto) {
        dto = service.insert(dto);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(dto.getId()).toUri();
        return ResponseEntity.created(uri).body(null);
    }

    // ATUALIZAR REGISTRO
    @PutMapping(value = "/{id}")
    public ResponseEntity<EmpresaDTO> update(@PathVariable long id, @RequestBody EmpresaDTO dto) {
        dto = service.update(id, dto);
        return ResponseEntity.ok().body(dto);
    }

    // EXCLUIR REGISTRO
    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

}
