import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from "./app.component";
import { AppRoutingModule } from './app.routing.module';

import { HomeComponent } from './home/home.component';

import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';

import { PageErrorComponent } from './page-error/page-error.component';

// import { PersonModule } from './person/person.module';

import { TokenService } from './shared/services/token.service';
import { ComponentsModule } from './shared/components/components.module';
import { AlertService } from './shared/services/alert.service';
import { ModalService } from './shared/services/modal.service';

import { PersonGuard } from './guards/person.guard';
import { AuthGuard } from './guards/auth.guard';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageErrorComponent,
    LoginComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    RouterModule,
    FormsModule,
    // PersonModule,
    ComponentsModule,
    HttpClientModule
  ],
  providers: [
    LoginService,
    TokenService,
    AlertService,
    ModalService,
    AuthGuard,
    PersonGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }