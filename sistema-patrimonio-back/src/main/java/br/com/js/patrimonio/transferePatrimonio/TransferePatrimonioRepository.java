package br.com.js.patrimonio.transferePatrimonio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransferePatrimonioRepository extends JpaRepository<TransferePatrimonio, Long> {
	
}
