import { NgModule, LOCALE_ID } from '@angular/core';


import localeBr from '@angular/common/locales/pt';

import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { SharedModule } from 'src/app/shared/shared.module';

// Registrando data como Português Brasileiro
registerLocaleData(localeBr, 'pt')

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    SharedModule
  ],
  declarations: [HomePage],
  providers:[
    {
      provide: LOCALE_ID,
      useValue: 'pt-br'
    }
  ],
})
export class HomePageModule {}
