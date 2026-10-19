import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService, ProductItem } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterLink, MatSnackBarModule],
  template: `
    <div class="home-container">
      <h2>Nasze Produkty</h2>
      <div class="product-grid">
        @for (product of products; track product.id) {
          <mat-card class="product-card">
            <mat-card-header>
              <mat-card-title>{{ product.name }}</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <p class="price">{{ product.price }} PLN</p>
              <p>{{ product.description }}</p>
            </mat-card-content>
            <mat-card-actions>
              <button mat-button color="primary" [routerLink]="['/product', product.id]">Szczegóły</button>
              <button mat-raised-button color="accent" (click)="addToCart(product)">Dodaj do koszyka</button>
            </mat-card-actions>
          </mat-card>
        }
      </div>
    </div>
  `,
  styles: [`
    .home-container { padding: 24px; max-width: 1200px; margin: 0 auto; }
    .product-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; margin-top: 20px; }
    .product-card { display: flex; flex-direction: column; justify-content: space-between; padding: 12px; }
    .price { font-size: 1.25rem; font-weight: bold; color: var(--cyan, #00acc1); }
  `]
})
export class HomeComponent {
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private snackBar = inject(MatSnackBar);

  products: ProductItem[] = this.productService.getProducts();

  addToCart(product: ProductItem) {
    this.cartService.addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image
    });
    this.snackBar.open(`Dodano do koszyka: ${product.name}`, 'OK', { duration: 2000 });
  }
}