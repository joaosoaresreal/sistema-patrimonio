import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PatrimonioService } from './services/domain/Patrimonio.service';
import { SharedModule } from './shared/shared.module';
import { AuthenticationService } from './services/domain/Authentication.service';
import { AuthInterceptor } from './config/AuthInterceptor';
import { UsuarioService } from './services/domain/Usuario.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, IonicModule.forRoot(), AppRoutingModule, SharedModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, 
    PatrimonioService, UsuarioService, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule {}
