import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonInput,
  IonButton,
  IonIcon, IonRow, IonCol, IonImg, IonGrid, IonLabel } from '@ionic/angular/standalone';
import { AuthentificationService } from 'src/app/core/services/authentification.service';
import { TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonLabel, IonGrid, IonImg, IonCol, IonRow, 
    IonIcon,
    IonItem,
    IonList,
    IonTitle,
    IonInput,
    IonHeader,
    IonButton,
    IonToolbar,
    IonContent,
    FormsModule,
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
  ],
})
export class RegisterPage implements OnInit {
  error = '';
  submitForm = false;
  showPassword = false;

  private router = inject(Router);
  private modalCtl = inject(ModalController);
  private serviceAuth = inject(AuthentificationService);

  form: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$'),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    birthDate: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
    ]),
  });

  constructor() {}

  ngOnInit() {}

  onSubmit() {
    if (this.form.valid) {
      // Handle form submission logic
      console.log('Form Submitted', this.form.value);
    } else {
      this.error = 'Please fill in all required fields correctly.';
    }
  }

  clearError(fieldName: string) {
    if (this.form.controls[fieldName].invalid) {
      this.form.controls[fieldName].markAsUntouched();
    }
  }

  isFieldFocused(fieldName: string): boolean {
    return document.activeElement === document.querySelector(`ion-input[name='${fieldName}']`);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
