package br.dev.joaosoares.patrimonio.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**")
		.allowedOrigins("http://localhost:8100") // Endereço onde sera liberado acesso
		.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS"); // Opções liberadas para o endereço
	}
}
