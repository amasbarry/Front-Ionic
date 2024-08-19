import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { HomePage } from '../../home/home.page';
import { addIcons } from 'ionicons';
import { cloudUploadOutline, personOutline } from 'ionicons/icons';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { NgIf } from '@angular/common';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonicModule, IonIcon, IonImg, IonItem, IonLabel } from '@ionic/angular';
import { IonInput } from '@ionic/angular/standalone';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: 
  [
    IonicModule,
    RouterOutlet, 
    RouterLink,
    NavbarComponent,
    HomePage,
    NgIf
  ],
})
export class ProfileComponent implements OnInit {
  selectedImage: string | undefined;

  constructor() {addIcons({personOutline, cloudUploadOutline}) }

  ngOnInit() {
   
  }

  onSubmit() {
  }

  async selectImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl, // Utilisation de DataUrl pour un affichage local
      source: CameraSource.Prompt, // Demande à l'utilisateur de choisir entre la caméra et la galerie
    });

    this.selectedImage = image.dataUrl; // Stocke l'image en tant que Data URL pour l'afficher localement
  }

  
}