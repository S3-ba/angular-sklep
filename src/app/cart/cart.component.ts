import { Component, computed, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Product } from '../product';

@Component({
  imports: [MatButtonModule],
  selector: 'app-cart',
  styleUrl: './cart.component.scss',
  templateUrl: './cart.component.html',
})
export class CartComponent {
  items = input.required<Product[]>();
  remove = output<number>();

  total = computed(() =>
    this.items().reduce((sum, p) => sum + p.price, 0)
  ); 
}
