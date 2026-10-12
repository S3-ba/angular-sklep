import { Injectable, computed, signal } from '@angular/core';
import { Product } from '../product';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  readonly items = signal<CartItem[]>([]);

  readonly count = computed(() => this.items().reduce((s, i) => s + i.quantity, 0));
  readonly total = computed(() => this.items().reduce((s, i) => s + i.quantity * i.product.price, 0));

  add(product: Product) {
    this.items.update(items => {
      const existing = items.find(i => i.product.id === product.id);
      return existing
        ? items.map(i => i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i)
        : [...items, { product, quantity: 1 }];
    });
  }

  increase(id: number) {
    this.items.update(items =>
      items.map(i => i.product.id === id ? { ...i, quantity: i.quantity + 1 } : i));
  }

  decrease(id: number) {
    this.items.update(items =>
      items
        .map(i => i.product.id === id ? { ...i, quantity: i.quantity - 1 } : i)
        .filter(i => i.quantity > 0));
  }

  remove(id: number) {
    this.items.update(items => items.filter(i => i.product.id !== id));
  }

  clear() {
    this.items.set([]);
  }
}