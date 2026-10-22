import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService, ProductItem } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, RouterLink, MatSnackBarModule],
  template: `
    @if (product) {
      <div class="detail-container">
        <button mat-button routerLink="/" class="back-btn">
          <mat-icon>arrow_back</mat-icon> Wróć do sklepu
        </button>
        
        <div class="product-content">
          <div class="image-container">
            <img [src]="product.image" [alt]="product.name" class="zoom-image">
          </div>
          
          <div class="info-container">
            <h1>{{ product.name }}</h1>
            <p class="price">{{ product.price }} PLN</p>
            
            <div class="rating">
              @for (star of [1, 2, 3, 4, 5]; track star) {
                <mat-icon 
                  class="star-icon" 
                  [class.filled]="star <= userRating"
                  (click)="rateProduct(star)">
                  star
                </mat-icon>
              }
              <span class="rating-text">({{ userRating }}.0 / 5.0) - Twoja ocena</span>
            </div>

            <p class="description">{{ product.description }}</p>
            
            <button mat-raised-button color="primary" (click)="addToCart(product)">
              Dodaj do koszyka
            </button>
          </div>
        </div>

        <div class="carousel-section">
          <h3>Pozostałe produkty</h3>
          <div class="carousel-list">
            @for (item of otherProducts; track item.id) {
              <div class="mini-card" [routerLink]="['/product', item.id]">
                <img [src]="item.image" [alt]="item.name">
                <h4>{{ item.name }}</h4>
                <p>{{ item.price }} PLN</p>
              </div>
            }
          </div>
        </div>
      </div>
    } @else {
      <p style="padding: 40px; text-align: center;">Ładowanie produktu lub brak produktu...</p>
    }
  `,
  styles: [`
    .detail-container { max-width: 1000px; margin: 30px auto; padding: 24px; background: white; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
    .product-content { display: flex; gap: 40px; margin-top: 20px; flex-wrap: wrap; }
    .image-container { flex: 1; min-width: 300px; overflow: hidden; border-radius: 8px; }
    .zoom-image { width: 100%; transition: transform 0.3s ease; cursor: zoom-in; }
    .zoom-image:hover { transform: scale(1.3); }
    .info-container { flex: 1; min-width: 300px; display: flex; flex-direction: column; gap: 16px; }
    .price { font-size: 1.8rem; font-weight: bold; color: var(--cyan, #00acc1); }
    .rating { display: flex; align-items: center; gap: 4px; }
    .star-icon { cursor: pointer; color: #e0e0e0; transition: transform 0.1s, color 0.2s; }
    .star-icon.filled { color: #ffb400; }
    .star-icon:hover { transform: scale(1.2); }
    .rating-text { margin-left: 8px; font-weight: 500; color: #555; }
    .carousel-section { margin-top: 50px; border-top: 1px solid #eee; padding-top: 20px; }
    .carousel-list { display: flex; gap: 16px; overflow-x: auto; padding-bottom: 10px; }
    .mini-card { min-width: 180px; padding: 12px; border: 1px solid #eee; border-radius: 8px; cursor: pointer; text-align: center; transition: 0.2s; }
    .mini-card:hover { border-color: var(--cyan, #00acc1); }
    .mini-card img { width: 100%; height: 100px; object-fit: cover; border-radius: 4px; }
  `]
})
export class ProductDetailComponent {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private snackBar = inject(MatSnackBar);

  product: ProductItem | undefined;
  otherProducts: ProductItem[] = [];
  userRating: number = 4; // Domyślna ocena

  constructor() {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.product = this.productService.getProductById(id);
      this.otherProducts = this.productService.getProducts().filter(p => p.id !== id);
    });
  }

  rateProduct(stars: number) {
    this.userRating = stars;
    this.snackBar.open(`Dziękujemy za ocenę: ${stars}/5 gwiazdek!`, 'OK', { duration: 2000 });
  }

  addToCart(product: ProductItem) {
    this.cartService.addToCart({ ...product, quantity: 1 });
    this.snackBar.open(`Dodano do koszyka: ${product.name}`, 'OK', { duration: 2000 });
  }
}