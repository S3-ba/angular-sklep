import { Injectable, signal } from '@angular/core';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private itemsSignal = signal<CartItem[]>([]);
  readonly items = this.itemsSignal.asReadonly();

  addToCart(product: CartItem) {
    const currentItems = this.itemsSignal();
    const existingIndex = currentItems.findIndex(item => item.id === product.id);
    if (existingIndex > -1) {
      const updated = [...currentItems];
      updated[existingIndex] = {
        ...updated[existingIndex],
        quantity: updated[existingIndex].quantity + 1
      };
      this.itemsSignal.set(updated);
    } else {
      this.itemsSignal.set([...currentItems, { ...product, quantity: 1 }]);
    }
  }

  increaseQuantity(productId: number) {
    this.itemsSignal.update(items =>
      items.map(item => item.id === productId ? { ...item, quantity: item.quantity + 1 } : item)
    );
  }

  decreaseQuantity(productId: number) {
    this.itemsSignal.update(items =>
      items.map(item => {
        if (item.id === productId && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      })
    );
  }

  removeItem(productId: number) {
    this.itemsSignal.update(items => items.filter(item => item.id !== productId));
  }

  getTotalPrice(): number {
    return this.itemsSignal().reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  getTotalQuantity(): number {
    return this.itemsSignal().reduce((sum, item) => sum + item.quantity, 0);
  }
}