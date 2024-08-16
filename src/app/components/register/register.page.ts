import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';
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
    RouterModule,
  
  ],
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage implements OnInit {
  fullName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
 

  constructor() {}
  ngOnInit(): void {
  }

  register() {
    if (this.password === this.confirmPassword) {
      // Implement your registration logic here
      console.log('User registered:', this.fullName, this.email);
    } else {
      console.error('Passwords do not match');
    }
  }
}
