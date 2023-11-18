package br.com.js.patrimonio.transferePatrimonio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import br.com.js.patrimonio.patrimonio.Patrimonio;


@Repository
public interface TransferePatrimonioRepository extends JpaRepository<TransferePatrimonio, Long> {

	// Buscar por patrimonio
	List<TransferePatrimonio> findByPlaqueta(String plaqueta);
}
