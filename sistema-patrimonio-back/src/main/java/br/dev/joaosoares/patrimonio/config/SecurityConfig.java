package br.dev.joaosoares.patrimonio.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import br.dev.joaosoares.patrimonio.security.AuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private AuthenticationFilter authenticationFilter;

    public static final String [] ENDPOINTS_WITH_AUTHENTICATION_NOT_REQUIRED = {
    		"/auth/login", "/auth/forgot-password", "/auth/**"
    };

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

    	http.csrf(Csrf -> Csrf.disable());

    	http.sessionManagement((session) -> 
			session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

    	http.authorizeHttpRequests(authorize -> authorize
				.requestMatchers("/auth/login", "/auth/forgot-password", "/auth/**").permitAll()
				.anyRequest().authenticated());

    	http.cors();

    	http.addFilterBefore(
    			authenticationFilter, UsernamePasswordAuthenticationFilter.class);

    	return http.build();

    }

}
