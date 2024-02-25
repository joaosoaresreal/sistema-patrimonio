package br.dev.joaosoares.patrimonio.transferePatrimonio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import br.dev.joaosoares.patrimonio.patrimonio.Patrimonio;


@Repository
public interface TransferePatrimonioRepository extends JpaRepository<TransferePatrimonio, Long> {

	// Buscar por patrimonio
	List<TransferePatrimonio> findByPlaqueta(String plaqueta);

	// Filtrar data de Transf
	@Query("SELECT t FROM TransferePatrimonio t WHERE CAST(t.dataHoraModificacao AS date) BETWEEN :startDate AND :endDate")
    List<TransferePatrimonio> findByDataHoraModificacaoBetween(@Param("startDate") Date startDate, @Param("endDate") Date endDate);

	// Filtrar plaqueta E data de Transf
	@Query("SELECT t FROM TransferePatrimonio t WHERE t.plaqueta = :plaqueta AND CAST(t.dataHoraModificacao AS date) BETWEEN :startDate AND :endDate")
	List<TransferePatrimonio> findByPlaquetaDataHoraModificacao(@Param("plaqueta") String plaqueta, @Param("startDate") Date startDate, @Param("endDate") Date endDate);
}
