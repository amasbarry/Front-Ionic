import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { Icon } from 'ionicons/dist/types/components/icon/icon';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage {
  fullName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor() {}

  register() {
    if (this.password === this.confirmPassword) {
      // Implement your registration logic here
      console.log('User registered:', this.fullName, this.email);
    } else {
      console.error('Passwords do not match');
    }
  }
}
