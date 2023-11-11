package br.com.js.patrimonio.services.validation;

import br.com.js.patrimonio.resources.exceptions.FieldMessage;
import br.com.js.patrimonio.usuario.Usuario;
import br.com.js.patrimonio.usuario.UsuarioInsertDTO;
import br.com.js.patrimonio.usuario.UsuarioRepository;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;

public class UsuarioInsertValidator implements ConstraintValidator<UsuarioInsertValid, UsuarioInsertDTO> {

    @Autowired
    private UsuarioRepository repository;

    @Override
    public void initialize(UsuarioInsertValid ann) {
    }

    @Override
    public boolean isValid(UsuarioInsertDTO dto, ConstraintValidatorContext context) {

        List<FieldMessage> list = new ArrayList<>();

        // testes de validação
        Usuario usuario = repository.findByEmail(dto.getEmail());

        if (usuario != null) {
            list.add(new FieldMessage("email", "O Email informado já existe no sistema"));
        }

        for (FieldMessage e : list) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate(e.getMessage()).addPropertyNode(e.getFieldName())
                    .addConstraintViolation();
        }
        return list.isEmpty();
    }
}
