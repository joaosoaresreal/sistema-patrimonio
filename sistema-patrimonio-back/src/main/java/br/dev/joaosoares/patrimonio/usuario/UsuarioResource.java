package br.dev.joaosoares.patrimonio.usuario;

import jakarta.validation.Valid;
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
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
@RequestMapping(value = "/api_usuarios")
public class UsuarioResource {
    
    @Autowired
    private UsuarioService service;

    // LISTAR
    @GetMapping
    public ResponseEntity<List<UsuarioDTO>> findAll(){
        List<UsuarioDTO> list = service.findAll();
        return ResponseEntity.ok().body(list);
    }

    // BUSCAR POR ID
    @GetMapping(value = "/{id}")
    public ResponseEntity<UsuarioDTO> findById(@PathVariable Long id) {
        UsuarioDTO dto = service.findById(id);
        return ResponseEntity.ok().body(dto);
    }

    // INSERIR REGISTRO
    @PostMapping
    public ResponseEntity<UsuarioDTO> insert(@Valid @RequestBody UsuarioInsertDTO dto){
        UsuarioDTO usuarioDTO = service.insert(dto);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(dto.getId()).toUri();
        return ResponseEntity.created(uri).body(null);
    }

    // ATUALIZAR REGISTRO
    @PutMapping(value = "/{id}", consumes = "multipart/form-data")
    public ResponseEntity<UsuarioDTO> update(@PathVariable long id, @RequestPart(value = "file", required = false) MultipartFile file, @Valid @RequestPart("usuario") UsuarioDTO dto){
        dto = service.update(id, dto, file);
        return ResponseEntity.ok().body(dto);
    }
    
    // EXCLUIR REGISTRO
    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    // ======================== Query Methods ==================================
    // BUSCAR POR CPF
    @GetMapping(value = "/cpf/{cpf}")
    public ResponseEntity<UsuarioDTO> findByCpf(@PathVariable String cpf){
        UsuarioDTO dto = service.findByCpf(cpf);
        return ResponseEntity.ok().body(dto);
    }

    // BUSCAR POR EMAIL
    @GetMapping(value = "/email/{email}")
    public ResponseEntity<UsuarioDTO> findByEmail(@PathVariable String email){
        UsuarioDTO dto = service.findByEmail(email);
        return ResponseEntity.ok().body(dto);
    }
}
