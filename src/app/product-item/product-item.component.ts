import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Product } from '../product';

@Component({
  imports: [MatButtonModule],
  selector: 'app-product-item',
  styleUrl: './product-item.component.scss',
  templateUrl: './product-item.component.html',
})
export class ProductItemComponent {
  product = input.required<Product>();
  add = output<Product>();
}
