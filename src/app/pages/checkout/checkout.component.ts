import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ShopService } from '../../services/shop.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

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
    MatSnackBarModule
  ],
  template: `
    <div class="checkout-container">
      <h2>Formularz Płatności</h2>
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
    .checkout-container { max-width: 500px; margin: 30px auto; padding: 24px; background: #fff; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
    form { display: flex; flex-direction: column; gap: 16px; }
    .radio-label { font-weight: 500; color: #333; margin-top: 8px; }
    .radio-group { display: flex; gap: 20px; }
  `]
})
export class CheckoutComponent {
  private fb = inject(FormBuilder);
  private shopService = inject(ShopService);
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
          this.snackBar.open('Transakcja udana! Przekierowywanie...', 'OK', { duration: 2500 });
          this.router.navigate(['/order-success']);
        },
        error: (err) => {
          this.snackBar.open(err.message, 'Zamknij', { duration: 4000 });
        }
      });
    }
  }
}