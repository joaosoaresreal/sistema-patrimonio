package br.com.js.patrimonio.services.validation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

@Constraint(validatedBy = UsuarioInsertValidator.class)
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)

public @interface UsuarioInsertValid {

    String message() default "Validation error";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
