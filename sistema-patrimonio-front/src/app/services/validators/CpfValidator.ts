import { AbstractControl } from "@angular/forms";

// Faz validação do CPF
export class CpfValidator {
  static ValidaCpf(controle: AbstractControl) {
    let cpf = controle.value; // Obtém o valor do controle de formulário passado como argumento e o armazena na variável

    if (cpf) {
      // Verifica se cpf é uma string antes de tentar substituir os caracteres
      if (typeof cpf === 'string') {
        cpf = cpf.replace(/[.-]/g, ''); //  remove os pontos e hífens
      } else {
        return { cpfNotValid: true }; // Retorna erro se não for uma string
      }

      let numbers, digits, sum, i, result, equalDigits;
      equalDigits = 1;
      //Verificar se o CPF tem 11 caracteres.
      if (cpf.length !== 11) {
        return { cpfNotValid: true };
      }

      // Verifica se todos os dígitos são iguais.
      for (i = 0; i < cpf.length - 1; i++) {
        if (cpf.charAt(i) !== cpf.charAt(i + 1)) {
          equalDigits = 0;
          break;
        }
      }

      //Realiza cálculos para verificar a validade do CPF.
      if (!equalDigits) {
        numbers = cpf.substring(0, 9);
        digits = cpf.substring(9);
        sum = 0;
        for (i = 10; i > 1; i--) {
          sum += numbers.charAt(10 - i) * i;
        }

        result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

        if (result !== Number(digits.charAt(0))) {
          return { cpfNotValid: true };
        }
        numbers = cpf.substring(0, 10);
        sum = 0;

        for (i = 11; i > 1; i--) {
          sum += numbers.charAt(11 - i) * i;
        }
        result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

        if (result !== Number(digits.charAt(1))) {
          return { cpfNotValid: true };
        }
        return null; // O método retorna 'null' se o CPF for válido
      } else {
        return { cpfNotValid: true }; // O método retorna um objeto com a propriedade 'cpfNotValid: true' se o CPF não for válido.
      }
    }
    return null; // se cpf for nulo ou indefinido, o método também retorna null.
  };
}

// https://pt.stackoverflow.com/questions/333805/como-validar-e-mail-e-cpf-em-angular-5
// https://medium.com/manacespereira/angular-ractiveforms-valida%C3%A7%C3%B5es-customizadas-com-formul%C3%A1rios-reativos-no-angular-6-3a3338f9add9
