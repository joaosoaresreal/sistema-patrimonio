import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { FormsComponent } from 'src/app/components/forms/forms.component';
import { ListsComponent } from '../components/lists/lists.component';
import { LayoutComponent } from '../components/layout/layout.component';


@NgModule({
  declarations: [NavbarComponent, LayoutComponent, FormsComponent, ListsComponent],
  imports: [CommonModule, IonicModule],
  exports: [NavbarComponent, LayoutComponent, FormsComponent, ListsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule {}