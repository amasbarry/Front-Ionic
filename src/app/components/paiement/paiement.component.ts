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
  ticketId : any = null
  ticket : any
  Tel:any

  ListReservation:any[] = []

  ngOnInit() {
    this.getBookingData();
    this.user = this.authService.getUser();
    this.getReservation();
    this.getTicketId()
    console.log(this.data.ticketNumber)
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

  getTicketId(){
    this.dataTransfer.currentData.subscribe(data=> {
        this.ticketId = data.id
        this.ticket = data
        console.log("ticket id : " + this.ticketId);
        console.log(this.ticket);

      }
    )
  }


  async getReservation(): Promise<any> {
    try {
      const res = await fetch(`http://localhost:8080/gestEvent/reservation/ListReservationBycat/`+ this.data.category.id +`/`+ this.data.category.categoryBillet.id +``);

      ///******Vérifie si la requête a réussi******/
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const results = await res.json();
      this.ListReservation = results;

      console.log(this.ListReservation);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  async reservation(){
    console.log("ListReservation.length :" + this.ListReservation.length);
    console.log("ticketNumber :" + this.data.ticketNumber);
    console.log("this.data.category.nbreBilletParPersonne :" + this.data.category.nbreBilletParPersonne);

    let i = 0;
    //console.log(this.data.category.id)
    let reservation:any = {
      "tel": `${this.Tel}`,
      "billet": {
        "id": this.data.category.id,
      },
      "statut": {
        "id": 1
      },
      "evenement": {
        "id": this.data.evnt[0].id
      },
      "methodePaiement": {
        "id": 1
      },
      "utilisateur": {
        "id": this.user.id
      },
      "category": {
        "id": this.data.category.categoryBillet.id
      }
    }

    if(this.ListReservation.length >= this.data.category.nbreBilletParPersonne){
      alert("Le nombre de reservation par personne pour ce type de ticket est atteint")
    }else {
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
  }

  sendData() {
    this.Ids.eventId = this.data.evnt.id;
    this.dataTransfer.changeData(this.Ids);
  }

  isNumber(value: any): boolean {
    return !isNaN(value);
  }

  async cancelTickets(id: any){
    if (this.ticket.reservation.tel !== this.Tel){
      alert("Your phone number is wrong. Please try with the number you did use when booking")
    }else {
      try {
        const res = await fetch("http://localhost:8080/gestEvent/QrCode/changeStatut/"+id+"", {
          method: 'PATCH'
        })
        const results = await res.json();
        console.log(results);
      }catch (e){
        console.log(e);
      }
      this.ngOnInit()
    }
  }
}
