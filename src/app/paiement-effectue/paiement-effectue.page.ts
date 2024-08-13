import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,
  IonContent,
  IonHeader, IonIcon, IonImg, IonInput, IonItem,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {addIcons} from "ionicons";
import {arrowBackSharp, callOutline, chatbubbleEllipsesOutline, chatbubbleOutline} from "ionicons/icons";

@Component({
  selector: 'app-paiement-effectue',
  templateUrl: './paiement-effectue.page.html',
  styleUrls: ['./paiement-effectue.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonButtons, IonCard, IonCardContent, IonIcon, IonInput, IonItem, IonCardHeader, IonCardTitle, IonCardSubtitle, IonImg]
})
export class PaiementEffectuePage implements OnInit {

  constructor() { addIcons({ arrowBackSharp,callOutline,chatbubbleEllipsesOutline })}

  ngOnInit() {
  }

}
