import { Injectable } from '@angular/core';

export interface ProductItem {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: ProductItem[] = [
    { id: 1, name: 'Słuchawki Bezprzewodowe', price: 249.99, image: 'https://via.placeholder.com/150', description: 'Wysokiej jakości słuchawki z redukcją szumów.' },
    { id: 2, name: 'Smartwatch Sportowy', price: 399.99, image: 'https://via.placeholder.com/150', description: 'Monitoruj swoje treningi i tętno każdego dnia.' },
    { id: 3, name: 'Myszka Gamingowa', price: 149.99, image: 'https://via.placeholder.com/150', description: 'Precyzyjna myszka dla graczy z podświetleniem RGB.' },
    { id: 4, name: 'Klawiatura Mechaniczna', price: 299.99, image: 'https://via.placeholder.com/150', description: 'Mechaniczne przełączniki zapewniające świetny skok klawiszy.' }
  ];

  getProducts(): ProductItem[] {
    return this.products;
  }

  getProductById(id: number): ProductItem | undefined {
    return this.products.find(p => p.id === id);
  }
}