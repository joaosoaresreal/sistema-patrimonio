import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Page404PageRoutingModule } from './page404-routing.module';

import { Page404Page } from './page404.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Page404PageRoutingModule,
    SharedModule
  ],
  declarations: [Page404Page]
})
export class Page404PageModule {}
