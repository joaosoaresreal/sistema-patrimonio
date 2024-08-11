package br.dev.joaosoares.patrimonio.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthResource {

	@Autowired
	private AuthService service;

    @PostMapping("/login")
    public ResponseEntity<RecoveryJwtTokenDto> authenticateUser(@RequestBody LoginUsuarioDto dto) {
        RecoveryJwtTokenDto token = service.authenticateUser(dto);
        return new ResponseEntity<>(token, HttpStatus.OK);
    }
}
