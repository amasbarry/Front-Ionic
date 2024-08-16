import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { HomePage } from '../../home/home.page';
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonIcon, IonItem, IonLabel, IonInput, IonButton, IonImg } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { cloudUploadOutline, personOutline } from 'ionicons/icons';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [IonImg, IonButton, IonInput, IonLabel, IonItem, IonIcon, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, RouterOutlet, RouterLink, NavbarComponent, HomePage, NgIf],
})
export class ProfileComponent implements OnInit {
  selectedImage: string | undefined;
  private router: Router;

  

  constructor(router:Router) {
    this.router=router;
    addIcons({personOutline, cloudUploadOutline 
      

    })  }

  ngOnInit() {
   
  }

  onSubmit() {
  }

  async selectImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl, 
      source: CameraSource.Prompt, 
    });

    this.selectedImage = image.dataUrl; 
  }

  onModifierClick() {
    this.router.navigate(['/modifier-profile']); 
  }

  
}