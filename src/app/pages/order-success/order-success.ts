import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-order-success',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule, MatIconModule],
  template: `
    <div class="success-container">
      <mat-icon class="success-icon">check_circle</mat-icon>
      <h2>Zamówienie zostało złożone pomyślnie!</h2>
      <p>Dziękujemy za zakupy w naszym sklepie. Twoja płatność została zweryfikowana.</p>
      <button mat-raised-button color="primary" routerLink="/">Wróć do strony głównej</button>
    </div>
  `,
  styles: [`
    .success-container { max-width: 500px; margin: 80px auto; padding: 40px; background: white; border-radius: 12px; text-align: center; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
    .success-icon { font-size: 64px; width: 64px; height: 64px; color: #4caf50; margin-bottom: 16px; }
    h2 { margin-bottom: 12px; color: #1c2b2e; }
    p { color: #666; margin-bottom: 24px; }
  `]
})
export class OrderSuccessComponent {}