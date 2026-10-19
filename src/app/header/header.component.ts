import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule, MatIconModule, MatBadgeModule],
  template: `
    <header class="header">
      <div class="logo" routerLink="/">Sklep Internetowy</div>
      <nav class="nav-links">
        <a mat-button routerLink="/">Strona Główna</a>
        <a mat-button routerLink="/cart" class="cart-btn">
          <mat-icon [matBadge]="cartService.items().length" matBadgeColor="accent">shopping_cart</mat-icon>
          Koszyk
        </a>
      </nav>
    </header>
  `,
  styles: [`
    .header { display: flex; justify-content: space-between; align-items: center; padding: 16px 32px; background: white; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
    .logo { font-size: 1.25rem; font-weight: bold; color: var(--cyan, #00acc1); cursor: pointer; }
    .nav-links { display: flex; gap: 12px; align-items: center; }
  `]
})
export class HeaderComponent {
  cartService = inject(CartService);
}