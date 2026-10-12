import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { OrderService } from './services/order.service';

export const orderGuard: CanActivateFn = () => {
  const order = inject(OrderService).lastOrder();
  // true = wpuść; UrlTree = przekieruj
  return order ? true : inject(Router).createUrlTree(['/']);
};