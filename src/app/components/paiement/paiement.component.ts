import { Component, OnInit } from '@angular/core';
import {addIcons} from "ionicons";
import {arrowBackSharp, callOutline} from "ionicons/icons";
import {
  IonButton,
  IonButtons,
  IonCard, IonCardContent,
  IonContent,
  IonHeader,
  IonIcon, IonInput, IonItem, IonRouterLink,
  IonTitle,
  IonToolbar
} from "@ionic/angular/standalone";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import { DataService } from 'src/app/service/DataService';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonIcon, IonButton, IonCard, IonCardContent, IonItem, IonInput, IonRouterLink, RouterLink]

})
export class PaiementComponent  implements OnInit {

    constructor(private dataTransfer: DataService, private authService: AuthService,) { addIcons({ arrowBackSharp,callOutline }) }

  data: any;
  user : any;
  Ids = {
    eventId: 0
  }
  ngOnInit() {
    this.getBookingData();
    this.user = this.authService.getUser();

  }
  back(){
    history.back()
  }

  getBookingData(){
    this.dataTransfer.currentData.subscribe(data=> {
      this.data = data
      console.log(this.data);
      }
    )
  }

  async reservation(){
    let i = 0;
    //console.log(this.data.category.id)
    let reservation:any = {
      /*billet: {
        id: this.data.category.billets[0].id,
      },*/
      "statut": {
        "id": 1
      },
      "evenement": {
        "id": this.data.evnt.id
      },
      "methodePaiement": {
        "id": 1
      },
      "utilisateur": {
        "id": this.user.id
      },
      "category": {
        "id": this.data.category.id
      }
    }

    for( i=0; i < this.data.ticketNumber; i++){
    try {
      const res = await fetch("http://localhost:8080/gestEvent/reservation/reserver", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reservation)
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  }

  sendData() {
    this.Ids.eventId = this.data.evnt.id;
    this.dataTransfer.changeData(this.Ids);
  }

}
