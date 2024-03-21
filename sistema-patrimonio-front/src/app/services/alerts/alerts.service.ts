import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor(private alertController: AlertController) { }

  async alertaPadrao(texto: string, button1: string, button2: string, buttonFunc1?: any, buttonFunc2?: any){
    const alert = await this.alertController.create({
      header: texto,
      buttons: [
        {
          text: button1,
          handler: () => {
            buttonFunc1()
          },
        },
        {
          text: button2,
          handler: () => { 
            buttonFunc2()
          },
        },
      ],
    });

    await alert.present();
  }

  alertaAtencao(titulo: string, texto: string, icone: any, cancel: boolean, botaoConfirma: string, botaoCancela?: string, cancelarFuncao?: any){
    Swal.fire({
      heightAuto: false, // Remove o 'heigth' que estava definido nativamente, pois ele quebra o estilo da pagina
      allowOutsideClick: false, // Ao clicar fora do alerta ele não vai fechar
      title: titulo,
      text: texto,
      icon: icone,
      showCancelButton: cancel,
      confirmButtonText: botaoConfirma,
      cancelButtonText: botaoCancela,
      // Customizção
      confirmButtonColor: 'var(--ion-color-success-shade)',
      cancelButtonColor: 'var(--ion-color-danger-tint)',
      backdrop: `linear-gradient(#FFF 70%)`,
      background: `var(--ion-color-secondary)`,
      color: `var(--ion-color-light)`
    }).then((result) => {
      if (result.isConfirmed) {} // Se o resultado for 'SIM' o modal será fechado
      else if (result.dismiss === Swal.DismissReason.cancel) { // Se o resultado for 'NÃO', vai fazer isso
        cancelarFuncao()
      }
    })
  }

  alertaOk(titulo: string, texto: string, icone: any, botaoConfirma: string, okFuncao?: any){
    Swal.fire({
      heightAuto: false, // Remove o 'heigth' que estava definido nativamente, pois ele quebra o estilo da pagina
      allowOutsideClick: false, // Ao clicar fora do alerta ele não vai fechar
      title: titulo,
      text: texto,
      icon: icone,
      showCancelButton: false,
      confirmButtonText: botaoConfirma,
      // Customizção
      confirmButtonColor: 'var(--ion-color-primary)',
      backdrop: `linear-gradient(#FFF 70%)`,
      background: `var(--ion-color-secondary)`,
      color: `var(--ion-color-light)`
    }).then((result) => {
      if (result.isConfirmed) {
        okFuncao()
      }
    })
  }

  alertaAcoes(titulo: string, texto: string, icone: any, botaoConfirma: string, botaoCancela: string, confirmaFuncao:any, cancelarFuncao: any){
    Swal.fire({
      heightAuto: false, // Remove o 'heigth' que estava definido nativamente, pois ele quebra o estilo da pagina
      allowOutsideClick: false, // Ao clicar fora do alerta ele não vai fechar
      title: titulo,
      text: texto,
      icon: icone,
      showCancelButton: true,
      confirmButtonText: botaoConfirma,
      cancelButtonText: botaoCancela,
      // Customizção
      confirmButtonColor: 'var(--ion-color-success-shade)',
      cancelButtonColor: 'var(--ion-color-danger-tint)',
      backdrop: `linear-gradient(#FFF 70%)`,
      background: `var(--ion-color-secondary)`,
      color: `var(--ion-color-light)`
    }).then((result) => { // Se o resultado for 'SIM' vai fazer isso
      if (result.isConfirmed) {
        confirmaFuncao()
      }
      else if (result.dismiss === Swal.DismissReason.cancel) { // Se o resultado for 'NÃO', vai fazer isso
        cancelarFuncao()
      }
    })
  }

}
