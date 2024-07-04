package br.dev.joaosoares.patrimonio.patrimonio;

import br.dev.joaosoares.patrimonio.departamento.Departamento;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PatrimonioRepository extends JpaRepository<Patrimonio, Long>{

    //QueryMethods
    // BUSCAR POR Nº PLAQUETA
    Patrimonio findByPlaqueta(String plaqueta);

    // LISTAR PATRIMONIOS ATIVOS POR DEPTO
    @Query("SELECT p FROM Patrimonio p WHERE p.departamento = :departamento AND p.status = br.dev.joaosoares.patrimonio.enums.Status.ATIVO")
    List<Patrimonio> findAtivosByDepartamento(Departamento departamento);

    // LISTAR PATRIMONIOS ATIVOS
    @Query("SELECT p FROM Patrimonio p WHERE p.status = br.dev.joaosoares.patrimonio.enums.Status.ATIVO")
    List<Patrimonio> findByAtivos();

}
