import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Layout
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';

// Autenticação
import { LoginComponent } from './features/auth/login/login.component';
import { CadastroComponent } from './features/auth/cadastro/cadastro.component';

// Conta
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { DepositoComponent } from './features/conta/deposito/deposito.component';
import { SaqueComponent } from './features/conta/saque/saque.component';
import { ExtratoComponent } from './features/conta/extrato/extrato.component';

// Investimentos
import { InvestimentoListaComponent } from './features/investimentos/lista/investimento-lista.component';
import { InvestimentoComprarComponent } from './features/investimentos/comprar/investimento-comprar.component';

// Interceptor JWT
import { AuthInterceptor } from './core/interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    LoginComponent,
    CadastroComponent,
    DashboardComponent,
    DepositoComponent,
    SaqueComponent,
    ExtratoComponent,
    InvestimentoListaComponent,
    InvestimentoComprarComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,   // Formulários reativos
    HttpClientModule       // Chamadas HTTP para o backend
  ],
  providers: [
    // Registra o interceptor para anexar o JWT em todas as requisições
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }