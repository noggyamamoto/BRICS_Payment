import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './features/auth/login/login.component';
import { CadastroComponent } from './features/auth/cadastro/cadastro.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { DepositoComponent } from './features/conta/deposito/deposito.component';
import { SaqueComponent } from './features/conta/saque/saque.component';
import { ExtratoComponent } from './features/conta/extrato/extrato.component';
import { InvestimentoListaComponent } from './features/investimentos/lista/investimento-lista.component';
import { InvestimentoComprarComponent } from './features/investimentos/comprar/investimento-comprar.component';

import { AuthGuard } from './core/guards/auth.guard';

/**
 * Mapa de rotas:
 *  - Públicas: /login, /cadastro
 *  - Protegidas (canActivate: [AuthGuard]): todas as demais
 */
const routes: Routes = [
  { path: '',                redirectTo: '/login', pathMatch: 'full' },
  { path: 'login',           component: LoginComponent },
  { path: 'cadastro',        component: CadastroComponent },
  { path: 'dashboard',       component: DashboardComponent,           canActivate: [AuthGuard] },
  { path: 'deposito',        component: DepositoComponent,            canActivate: [AuthGuard] },
  { path: 'saque',           component: SaqueComponent,               canActivate: [AuthGuard] },
  { path: 'extrato',         component: ExtratoComponent,             canActivate: [AuthGuard] },
  { path: 'investimentos',   component: InvestimentoListaComponent,   canActivate: [AuthGuard] },
  { path: 'investimentos/comprar/:id', component: InvestimentoComprarComponent, canActivate: [AuthGuard] },
  { path: '**',              redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }