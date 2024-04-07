package br.dev.joaosoares.patrimonio.services.exceptions;

public class ResourcesNotFoundException extends RuntimeException {
    private static final long serialVersionUID = 3905676296701742101L;

	public ResourcesNotFoundException(String msg) {
		super(msg);
	}
}
