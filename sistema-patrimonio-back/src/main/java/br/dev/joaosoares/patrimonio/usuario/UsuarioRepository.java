package br.dev.joaosoares.patrimonio.usuario;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long>{

    //QueryMethods
    // BUSCAR POR CPF
    Usuario findByCpf(String cpf);

    Usuario findByEmail(String email);
}
