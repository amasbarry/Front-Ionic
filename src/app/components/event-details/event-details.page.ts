import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import {ActivatedRoute, Router, RouterLink, RouterOutlet} from "@angular/router";
import { NavbarComponent } from '../navbar/navbar.component';
import { Utilisateur } from 'src/app/models/utilisateurmodel.component';
import { AuthService } from 'src/app/service/auth.service';
import { EventServiceService } from 'src/app/service/event-service.service';
import { Evenement } from 'src/app/models/Evenement';
import { DataService } from 'src/app/service/DataService';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.page.html',
  styleUrls: ['./event-details.page.css'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,RouterLink, RouterOutlet,
    NavbarComponent,
    NgIf,
    NgFor
  ]
})
export class EventDetailsPage implements OnInit {


  ticketNumber: number = 1;
  categories: any[] = [];

  category:any;

  user: Utilisateur | null = null;

  topay:any = {};
  eventId: any


  constructor(
    private authService: AuthService,
    private eventService: EventServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService,
  ) {}

  ngOnInit() {
    this.user = this.authService.getUser();
    // Récupérer les informations de l'utilisateur
    // this.eventService.getEvents().subscribe(
    //   (data: any) => {
    //     this.event = data;
    //     console.log("event:",data);
    //   },
       this.eventId = this.route.snapshot.params['id'];
       this.getEventById();
       this.getCategory();


  }

  getEventById(){
    this.eventService.getEventById(this.eventId).subscribe(data=>{
      this.event.push(data);
      console.log(this.event);
    })
  }

  event: any[] = [];

  back(){
    history.back()
  }

  increment(){
    if(this.ticketNumber >=this.category?.billets[0]?.nbreBilletParPersonne){
      return this.ticketNumber == this.category?.billets[0]?.nbreBilletParPersonne;
    }
    return this.ticketNumber++
  }

  async getCategory(){
    const res = await fetch("http://localhost:8080/gestEvent/categories/AfficherBillet");
    const reults = await res.json();
    this.categories = reults;
    console.log(this.categories);
    this.category = this.categories[0]
    console.log(this.category);
  }

  stockercat(c:any){
    this.category= this.categories.find(data => data.category === c.value);
    console.log(this.category)
  }
  decrement(){
    if(this.ticketNumber <=0){
      return this.ticketNumber == 0;
    }
    return this.ticketNumber--;
  }

  sendData() {
    this.topay.ticketNumber = this.ticketNumber;
    this.topay.category = this.category;
    this.topay.evnt = this.event;
    this.dataService.changeData(this.topay);
  }
}
