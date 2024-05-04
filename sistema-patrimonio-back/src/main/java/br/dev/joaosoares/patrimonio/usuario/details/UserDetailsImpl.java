package br.dev.joaosoares.patrimonio.usuario.details;

import java.util.Collection;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.Getter;

import br.dev.joaosoares.patrimonio.usuario.Usuario;

@Getter
public class UserDetailsImpl implements UserDetails {

	private Usuario user;

	   public UserDetailsImpl(Usuario user) {
	        this.user = user;
	    }

	    @Override
	    public Collection<? extends GrantedAuthority> getAuthorities() {
	        /*
	         Este método converte a lista de papéis (roles) associados ao usuário
	         em uma coleção de GrantedAuthorities, que é a forma que o Spring Security
	         usa para representar papéis. Isso é feito mapeando cada papel para um
	         novo SimpleGrantedAuthority, que é uma implementação simples de
	         GrantedAuthority
	        */
	        return user.getRoles().stream().map(role -> 
	        	new SimpleGrantedAuthority(role.getAuthority())).collect(Collectors.toList());
//	        		user.getRoles()
//	                .stream()
//	                .map(role -> new SimpleGrantedAuthority(role.getName().name()))
//	                .collect(Collectors.toList());
	    }

	    @Override
	    public String getPassword() {
	        return user.getSenha();
	    } // Retorna a credencial do usuário que criamos anteriormente

	    @Override
	    public String getUsername() {
	        return user.getEmail();
	    } // Retorna o nome de usuário do usuário que criamos anteriormente

	    @Override
	    public boolean isAccountNonExpired() {
	        return true;
	    }

	    @Override
	    public boolean isAccountNonLocked() {
	        return true;
	    }

	    @Override
	    public boolean isCredentialsNonExpired() {
	        return true;
	    }

	    @Override
	    public boolean isEnabled() {
	        return true;
	    }
	
}
