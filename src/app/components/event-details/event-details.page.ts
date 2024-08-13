import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.page.html',
  styleUrls: ['./event-details.page.css'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,RouterLink, RouterOutlet,NavbarComponent]
})
export class EventDetailsPage implements OnInit {

  ticketNumber: number = 1;

  constructor() { }

  ngOnInit() {
  }

  back(){
    history.back()
  }

  increment(){
    return this.ticketNumber++
  }

  decrement(){
    if(this.ticketNumber <=0){
      return this.ticketNumber == 0;
    }
    return this.ticketNumber--;
  }

}
