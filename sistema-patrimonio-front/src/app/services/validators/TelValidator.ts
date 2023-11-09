import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TelValidator {
  telService(telefone: any) {
    let telefoneValida = telefone

    let r = telefoneValida.replace(/\D/g, ""); // Remove todos os caracteres não numéricos (exceto dígitos)
    r = r.replace(/^0/, ""); // Remove um zero inicial, se houver

    if (r.length >= 11) {
      r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
    } else if (r.length > 10) {
      r = r.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
    } else if (r.length > 2) {
      r = r.replace(/^(\d\d)(\d{4})(\d{4}).*/, "($1) $2-$3");
    } else if (telefoneValida.trim() !== "") {
      r = r.replace(/^(\d*)/, "($1");
    }

    return r // Armazena o telefone formatado
  }
}