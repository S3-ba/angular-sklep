import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ShopService } from '../../services/shop.service';
import { CartService } from '../../services/cart.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    RouterLink
  ],
  template: `
    <div class="checkout-container">
      <button mat-button routerLink="/cart"><mat-icon>arrow_back</mat-icon> Wróć do koszyka</button>
      <h2>Formularz Płatności i Zamówienia</h2>
      
      <div class="summary-box">
        <h3>Podsumowanie koszyka</h3>
        <p>Łączna kwota do zapłaty: <strong>{{ cartService.getTotalPrice() }} PLN</strong></p>
      </div>

      <form [formGroup]="checkoutForm" (ngSubmit)="onSubmit()">
        <mat-form-field appearance="outline">
          <mat-label>Imię</mat-label>
          <input matInput formControlName="firstName" required>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Nazwisko</mat-label>
          <input matInput formControlName="lastName" required>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Adres dostawy</mat-label>
          <input matInput formControlName="address" required>
        </mat-form-field>

        <label class="radio-label">Wybierz formę płatności:</label>
        <mat-radio-group formControlName="paymentMethod" class="radio-group">
          <mat-radio-button value="card">Karta płatnicza</mat-radio-button>
          <mat-radio-button value="blik">BLIK</mat-radio-button>
        </mat-radio-group>

        @if (checkoutForm.get('paymentMethod')?.value === 'card') {
          <mat-form-field appearance="outline">
            <mat-label>Numer karty</mat-label>
            <input matInput formControlName="cardNumber" placeholder="xxxx xxxx xxxx xxxx">
          </mat-form-field>
        }

        @if (checkoutForm.get('paymentMethod')?.value === 'blik') {
          <mat-form-field appearance="outline">
            <mat-label>Kod BLIK</mat-label>
            <input matInput formControlName="blikCode" placeholder="123456" maxlength="6">
          </mat-form-field>
        }

        <button mat-raised-button color="primary" type="submit" [disabled]="checkoutForm.invalid">
          Złóż zamówienie i zapłać
        </button>
      </form>
    </div>
  `,
  styles: [`
    .checkout-container { max-width: 600px; margin: 30px auto; padding: 24px; background: #fff; border-radius: 12px; box-shadow: 0 4px 16px rgba(0,0,0,0.08); }
    .summary-box { background: #f8f9fa; padding: 12px 16px; border-radius: 8px; margin-bottom: 20px; }
    form { display: flex; flex-direction: column; gap: 16px; }
    .radio-label { font-weight: 500; color: #333; margin-top: 8px; }
    .radio-group { display: flex; gap: 20px; }
  `]
})
export class CheckoutComponent {
  private fb = inject(FormBuilder);
  private shopService = inject(ShopService);
  cartService = inject(CartService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  checkoutForm: FormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    address: ['', Validators.required],
    paymentMethod: ['card', Validators.required],
    cardNumber: [''],
    blikCode: ['']
  });

  onSubmit() {
    if (this.checkoutForm.valid) {
      this.shopService.submitOrder(this.checkoutForm.value).subscribe({
        next: () => {
          this.snackBar.open('Transakcja udana!', 'OK', { duration: 2000 });
          this.router.navigate(['/order-success']);
        },
        error: (err) => {
          this.snackBar.open(err.message, 'Zamknij', { duration: 4000 });
        }
      });
    }
  }
}