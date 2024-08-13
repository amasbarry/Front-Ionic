import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import {arrowBackSharp, callOutline} from 'ionicons/icons';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonButtons,
  IonCard, IonCardContent,
  IonContent,
  IonHeader,
  IonIcon, IonInput, IonItem, IonRouterLink,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {RouterLink} from "@angular/router";


@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.page.html',
  styleUrls: ['./paiement.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonIcon, IonButton, IonCard, IonCardContent, IonItem, IonInput,IonRouterLink]
})
export class PaiementPage implements OnInit {

  constructor() { addIcons({ arrowBackSharp,callOutline }) }

  ngOnInit() {
  }

}
