import { Component } from '@angular/core';
import { Router } from '@angular/router';

/** Menu lateral com links principais. */
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  /** Itens de navegação. */
  menu = [
    { label: 'Início',        icon: '🏠', route: '/dashboard' },
    { label: 'Depositar',     icon: '💰', route: '/deposito' },
    { label: 'Sacar',         icon: '🏧', route: '/saque' },
    { label: 'Extrato',       icon: '📄', route: '/extrato' },
    { label: 'Investimentos', icon: '📈', route: '/investimentos' }
  ];

  constructor(private router: Router) {}

  /** Navega para a rota selecionada. */
  go(route: string): void {
    this.router.navigate([route]);
  }

  /** Verifica se a rota está ativa (para destaque visual). */
  isActive(route: string): boolean {
    return this.router.url.startsWith(route);
  }
}