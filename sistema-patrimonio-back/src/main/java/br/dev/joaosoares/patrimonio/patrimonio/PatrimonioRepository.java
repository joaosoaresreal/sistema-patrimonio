package br.dev.joaosoares.patrimonio.patrimonio;

import br.dev.joaosoares.patrimonio.departamento.Departamento;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PatrimonioRepository extends JpaRepository<Patrimonio, Long>{
    
    //QueryMethods
    // BUSCAR POR Nº PLAQUETA
    Patrimonio findByPlaqueta(String plaqueta);
    
    // LISTAR POR DEPTO
    List<Patrimonio> findByDepartamento(Departamento departamento);
    
}
