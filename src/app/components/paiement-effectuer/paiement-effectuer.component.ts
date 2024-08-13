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
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-paiement-effectuer',
  templateUrl: './paiement-effectuer.component.html',
  styleUrls: ['./paiement-effectuer.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,RouterLink]

})
export class PaiementEffectuerComponent  implements OnInit {

  constructor() { addIcons({ arrowBackSharp,callOutline,chatbubbleEllipsesOutline })}

  ngOnInit() {}

}