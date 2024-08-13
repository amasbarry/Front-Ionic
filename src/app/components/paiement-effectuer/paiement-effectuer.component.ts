import { Component, OnInit } from '@angular/core';
import {addIcons} from "ionicons";
import {arrowBackSharp, callOutline, chatbubbleEllipsesOutline} from "ionicons/icons";
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,
  IonContent,
  IonHeader, IonIcon, IonImg, IonInput, IonItem,
  IonTitle,
  IonToolbar
} from "@ionic/angular/standalone";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-paiement-effectuer',
  templateUrl: './paiement-effectuer.component.html',
  styleUrls: ['./paiement-effectuer.component.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonButtons, IonCard, IonCardContent, IonIcon, IonInput, IonItem, IonCardHeader, IonCardTitle, IonCardSubtitle, IonImg, RouterLink]

})
export class PaiementEffectuerComponent  implements OnInit {

  constructor() { addIcons({ arrowBackSharp,callOutline,chatbubbleEllipsesOutline })}

  ngOnInit() {}

}
