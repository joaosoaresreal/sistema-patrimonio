package br.dev.joaosoares.patrimonio.departamento;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DepartamentoRepository extends JpaRepository<Departamento, Long>{
    
	// SELECT nome FROM tb_departamento
	@Query("SELECT new br.dev.joaosoares.patrimonio.departamento.DepartamentoNomeDTO(obj.id, obj.nome) FROM Departamento obj")
	List<DepartamentoNomeDTO> findByNomeSQL();
}
