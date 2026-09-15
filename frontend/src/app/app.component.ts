import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from './core/services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn = false;

  constructor(private tokenService: TokenService, private router: Router) {
    this.router.events.subscribe(() => {
      this.isLoggedIn = this.tokenService.isLoggedIn();
    });
  }

  logout(): void {
    this.tokenService.removeToken();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}