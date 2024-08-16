import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { IonInput, IonItem, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonLabel, IonButton } from "@ionic/angular/standalone";

@Component({
  selector: 'app-modifier-profile',
  templateUrl: './modifier-profile.component.html',
  styleUrls: ['./modifier-profile.component.scss'],
  standalone: true,
  imports: [IonButton, IonLabel, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonInput,  NgIf]
})
export class ModifierProfileComponent {

  constructor(private router: Router) {}

  onSave() {
    console.log('Profile updated');
    this.router.navigate(['/profile']); 
  }

  onCancel() {
    this.router.navigate(['/profile']); 
  }
}
