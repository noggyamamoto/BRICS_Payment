import { Component, EventEmitter, Output } from '@angular/core';
import { TokenService } from '../../../core/services/token.service';

/**
 * Barra superior com saudação ao usuário e botão de logout.
 * Emite evento `logout` que é tratado no AppComponent.
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Output() logout = new EventEmitter<void>();
  userName = 'Cliente';

  constructor(private tokenService: TokenService) {
    const user = this.tokenService.getUser();
    if (user?.nome) this.userName = user.nome;
  }

  emitLogout(): void { this.logout.emit(); }
}