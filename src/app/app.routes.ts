import { Routes } from '@angular/router';
import { orderGuard } from './order.guard';

export const routes: Routes = [
  {
    path: '',
    title: 'Sklep',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'product/:id',
    title: 'Produkt',
    loadComponent: () => import('./pages/product-page/product-page.component').then(m => m.ProductPageComponent)
  },
  {
    path: 'cart',
    title: 'Koszyk',
    loadComponent: () => import('./pages/cart-page/cart-page.component').then(m => m.CartPageComponent)
  },
  {
    path: 'checkout',
    title: 'Płatność',
    loadComponent: () => import('./pages/checkout/checkout.component').then(m => m.CheckoutComponent)
  },
  {
    path: 'summary',
    title: 'Podsumowanie zamówienia',
    canActivate: [orderGuard],
    loadComponent: () => import('./pages/summary/summary.component').then(m => m.SummaryComponent)
  },
  {
    path: '**',
    title: 'Nie znaleziono',
    loadComponent: () => import('./pages/error/error.component').then(m => m.ErrorComponent)
  }
];