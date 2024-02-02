import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { FormsComponent } from 'src/app/components/forms/forms.component';


@NgModule({
  declarations: [NavbarComponent, FormsComponent],
  imports: [CommonModule, IonicModule],
  exports: [NavbarComponent, FormsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule {}