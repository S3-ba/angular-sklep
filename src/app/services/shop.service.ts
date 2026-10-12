import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  submitOrder(orderData: any): Observable<any> {
    const isError = Math.random() < 0.3; // 30% szans na błąd

    return new Observable(observer => {
      setTimeout(() => {
        if (isError) {
          observer.error(new Error('Błąd płatności! Transakcja została odrzucona. Spróbuj ponownie.'));
        } else {
          observer.next({ success: true, orderId: Math.floor(Math.random() * 1000000) });
          observer.complete();
        }
      }, 1000);
    });
  }
}