import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import { NavbarComponent } from '../navbar/navbar.component';
import {LitleService} from "../../service/Litle.service";

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.page.html',
  styleUrls: ['./event-details.page.css'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,RouterLink, RouterOutlet,NavbarComponent]
})
export class EventDetailsPage implements OnInit {

  ticketNumber: number = 0;
  category: any[] = []

  constructor(private litleService: LitleService) { }

  ngOnInit() {
    this.getCategory()
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
  back(){
    this.litleService.back()
  }

  async getCategory(){
    const res = await fetch("http://localhost:8080/gestEvent/categories/AfficherBillet");
    const reults = await res.json();
    this.category = reults;
    console.log(this.category)
  }
}
