package br.dev.joaosoares.patrimonio.baixaPatrimonio;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class BaixaPatrimonioService {

	@Autowired
	private BaixaPatrimonioRepository repository;

	// LISTAR
	@Transactional(readOnly = true)
	public List<BaixaPatrimonioDTO> findAll(){
		List<BaixaPatrimonio> lista = repository.findAll();
		return lista.stream().map(x -> new BaixaPatrimonioDTO(x)).collect(Collectors.toList());
	}

    // BUSCAR POR DEPTO DE BAIXA
    @Transactional(readOnly = true)
    public List<BaixaPatrimonioDTO> findByDepartamento(int id) {
        List<BaixaPatrimonio> lista = repository.findByDepartamento(id);
        return lista.stream().map(x -> new BaixaPatrimonioDTO(x)).collect(Collectors.toList());
    }
}
