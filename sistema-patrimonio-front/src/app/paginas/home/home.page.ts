import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';



@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})


export class HomePage implements OnInit {

  // Gerando a data do dia, de forma automatizada
  today: number = Date.now();
  
  constructor(public nav: NavController) { }
  
  abrirPagina(page: string){
    this.nav.navigateForward(page)
  }


  ngOnInit() {
  }

}
