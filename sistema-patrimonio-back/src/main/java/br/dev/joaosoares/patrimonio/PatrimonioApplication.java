package br.dev.joaosoares.patrimonio;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
@EnableWebMvc
public class PatrimonioApplication implements WebMvcConfigurer {

	public static void main(String[] args) {
		SpringApplication.run(PatrimonioApplication.class, args);
	}

}
