package br.dev.joaosoares.patrimonio.usuario.details;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

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
		 * Este método converte a lista de papéis (roles) associados ao usuário em uma
		 * coleção de GrantedAuthorities, que é a forma que o Spring Security usa para
		 * representar papéis. Isso é feito mapeando cada papel para um novo
		 * SimpleGrantedAuthority, que é uma implementação simples de GrantedAuthority
		 */
		return user.getRoles().stream().map(role -> new SimpleGrantedAuthority(role.getAuthority()))
				.collect(Collectors.toList());
	}

	@Override
	public String getPassword() {
		return user.getSenha();
	} // Retorna a credencial do usuário que criamos anteriormente

	@Override
	public String getUsername() {
		return user.getEmail();
	} // Retorna o nome de usuário do usuário que criamos anteriormente

	public String getDados() {
		try {
			ObjectMapper mapper = new ObjectMapper();
			Map<String, String> dados = new HashMap<>();

			dados.put("idUsuario", String.valueOf(user.getId()));
			dados.put("nomeUsuario", user.getNome());
			dados.put("nickname", user.getNickName());
			dados.put("departamentoId", String.valueOf(user.getDepartamento().id)); // converte o ID para String
			dados.put("departamentoNome", user.getDepartamento().nome);
			dados.put("foto", user.getFoto());
			
			return mapper.writeValueAsString(dados);			
		} catch (JsonProcessingException e) {
			throw new RuntimeException("Erro ao processar JSON no login do Usuário", e);
		}
	}

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
