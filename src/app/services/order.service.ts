import { Injectable, signal } from '@angular/core';
import { CartItem } from './cart.service';

export interface Order {
  id: number;
  customer: string;
  address: string;
  paymentMethod: string;
  items: CartItem[];
  total: number;
}

@Injectable({ providedIn: 'root' })
export class OrderService {
  readonly lastOrder = signal<Order | null>(null);

  pay(): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() < 0.2) {
          reject(new Error('Płatność odrzucona przez bank. Spróbuj ponownie.'));
        } else {
          resolve();
        }
      }, 1500);
    });
  }
}