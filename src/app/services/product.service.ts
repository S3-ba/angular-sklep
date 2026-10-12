import { Injectable } from "@angular/core";
import { Product } from "../product";

@Injectable({providedIn: 'root'})
export class ProductService{
    readonly products : Product[] = [
        {
      id: 1, name: 'Klawiatura', price: 199, rating: 4.5, ratingCount: 128,
      image: 'https://picsum.photos/seed/klawiatura/800/600',
      description: 'Mechaniczna klawiatura z podświetleniem RGB, przełącznikami typu red i aluminiową obudową. Cicha, szybka i wygodna zarówno do pracy, jak i do gier.'
    },
    {
      id: 2, name: 'Mysz', price: 99, rating: 4.2, ratingCount: 86,
      image: 'https://picsum.photos/seed/mysz/800/600',
      description: 'Bezprzewodowa mysz optyczna z sześcioma przyciskami, czujnikiem 16 000 DPI i baterią na około 70 godzin pracy.'
    },
    {
      id: 3, name: 'Monitor', price: 899, rating: 4.7, ratingCount: 54,
      image: 'https://picsum.photos/seed/monitor/800/600',
      description: '27-calowy monitor IPS o rozdzielczości QHD i odświeżaniu 144 Hz. Szerokie kąty widzenia i wierne kolory.'
    },
    {
      id: 4, name: 'Słuchawki', price: 149, rating: 4.0, ratingCount: 211,
      image: 'https://picsum.photos/seed/sluchawki/800/600',
      description: 'Nauszne słuchawki z mikrofonem, miękkimi poduszkami i pasywną izolacją szumów. Lekkie, więc nie męczą podczas długiego słuchania.'
    }
    ];

    getById(id: number): Product | undefined{
        return this.products.find(p => p.id === id);
    }
}