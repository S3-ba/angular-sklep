import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from '../../cart/cart.component';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule, CartComponent],
  template: `
    <div class="page-container">
      <app-cart></app-cart>
    </div>
  `,
  styles: [`
    .page-container { max-width: 800px; margin: 40px auto; padding: 0 20px; }
  `]
})
export class CartPageComponent {}