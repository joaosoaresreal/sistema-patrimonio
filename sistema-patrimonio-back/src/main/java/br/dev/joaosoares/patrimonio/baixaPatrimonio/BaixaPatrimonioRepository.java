package br.dev.joaosoares.patrimonio.baixaPatrimonio;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface BaixaPatrimonioRepository extends JpaRepository<BaixaPatrimonio, Long> {

	@Query("SELECT b FROM BaixaPatrimonio b " +
		       "JOIN b.patrimonio p " +
		       "JOIN p.departamento d " +
		       "WHERE d.id = :id") // SELECIONA AS BAIXAS POR DEPTO
	List<BaixaPatrimonio> findByDepartamento(int id);

}
