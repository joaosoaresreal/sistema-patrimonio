package br.dev.joaosoares.patrimonio.baixaPatrimonio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BaixaPatrimonioRepository extends JpaRepository<BaixaPatrimonio, Long> {

}
