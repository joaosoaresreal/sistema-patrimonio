package br.dev.joaosoares.patrimonio.usuario;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long>{

    //QueryMethods
    // BUSCAR POR CPF
    Usuario findByCpf(String cpf);

    Usuario findByEmail(String email);

    @Query("SELECT u FROM Usuario u WHERE u.email = :email")
    Optional<Usuario> findByUserEmail(String email);
}
