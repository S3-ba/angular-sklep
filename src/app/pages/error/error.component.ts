import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-error',
  imports: [RouterLink, MatButtonModule],
  template: `
    <div class="panel">
      <h2>Ups, coś poszło nie tak</h2>
      <p>Strona, której szukasz, nie istnieje albo wystąpił błąd.</p>
      <a matButton="filled" routerLink="/">Wróć do sklepu</a>
    </div>
  `
})
export class ErrorComponent {}