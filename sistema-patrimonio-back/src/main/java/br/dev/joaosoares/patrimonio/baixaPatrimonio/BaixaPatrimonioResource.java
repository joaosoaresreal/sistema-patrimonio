package br.dev.joaosoares.patrimonio.baixaPatrimonio;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api_baixa-patrimonio")
public class BaixaPatrimonioResource {

	@Autowired
	private BaixaPatrimonioService service;

	// LISTAR
	@GetMapping
	public ResponseEntity<List<BaixaPatrimonioDTO>> findAll(){
		List<BaixaPatrimonioDTO> list = service.findAll();
		return ResponseEntity.ok().body(list);
	}


    // BUSCAR POR DEPTO DE BAIXA
    @GetMapping(value = "/depto/{id}")
    public ResponseEntity<List<BaixaPatrimonioDTO>> findByDepartamento(@PathVariable int id){
        List<BaixaPatrimonioDTO> lista = service.findByDepartamento(id);
        return ResponseEntity.ok().body(lista);
    }
}
