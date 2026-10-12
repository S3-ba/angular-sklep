import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService, CartItem } from '../services/cart.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, RouterLink],
  template: `
    <div class="cart-container">
      <h3>Twój Koszyk</h3>
      @if (cartService.items().length === 0) {
        <p>Koszyk jest pusty.</p>
      } @else {
        <ul class="cart-list">
          @for (item of cartService.items(); track item.id) {
            <li>
              <span>{{ item.name }} - {{ item.price }} PLN</span>
              <div class="controls">
                <button mat-icon-button (click)="cartService.decreaseQuantity(item.id)">
                  <mat-icon>remove</mat-icon>
                </button>
                <span>{{ item.quantity }}</span>
                <button mat-icon-button (click)="cartService.increaseQuantity(item.id)">
                  <mat-icon>add</mat-icon>
                </button>
                <button mat-icon-button color="warn" (click)="cartService.removeItem(item.id)">
                  <mat-icon>delete</mat-icon>
                </button>
              </div>
            </li>
          }
        </ul>
        <div class="cart-summary">
          <h4>Suma: {{ cartService.getTotalPrice() }} PLN</h4>
          <button mat-raised-button color="primary" routerLink="/checkout">Przejdź do płatności</button>
        </div>
      }
    </div>
  `,
  styles: [`
    .cart-container { padding: 16px; background: white; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    .cart-list { list-style: none; padding: 0; }
    .cart-list li { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1px solid #eee; padding-bottom: 8px; }
    .controls { display: flex; align-items: center; gap: 4px; }
    .cart-summary { margin-top: 16px; text-align: right; }
  `]
})
export class CartComponent {
  cartService = inject(CartService);
}