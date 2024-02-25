package br.dev.joaosoares.patrimonio.services.validation;

import br.dev.joaosoares.patrimonio.resources.exceptions.FieldMessage;
import br.dev.joaosoares.patrimonio.usuario.Usuario;
import br.dev.joaosoares.patrimonio.usuario.UsuarioRepository;
import br.dev.joaosoares.patrimonio.usuario.UsuarioUpdateDTO;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import java.lang.annotation.Annotation;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerMapping;

public class UsuarioUpdateValidator implements ConstraintValidator<UsuarioUpdateValid, UsuarioUpdateDTO> {

    @Autowired
    private HttpServletRequest request;

    @Autowired
    private UsuarioRepository repository;

    @Override
    public void initialize(UsuarioUpdateValid ann) {
    }

    @Override
    public boolean isValid(UsuarioUpdateDTO dto, ConstraintValidatorContext context) {

        List<FieldMessage> list = new ArrayList<>();

        // testes de validação
        var uriVars = (Map<String, String>) request.getAttribute(HandlerMapping.URI_TEMPLATE_VARIABLES_ATTRIBUTE);
        long associadoId = Long.parseLong(uriVars.get("id"));

        Usuario usuario = repository.findByEmail(dto.getEmail());

        if (usuario != null && associadoId != usuario.getId()) {
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
