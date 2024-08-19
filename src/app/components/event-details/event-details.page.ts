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

user: Utilisateur | null = null;
  event:Evenement| null = null;

  constructor(
    private authService: AuthService,
    private eventService: EventServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.user = this.authService.getUser(); // Récupérer les informations de l'utilisateur
    // this.eventService.getEvents().subscribe(
    //   (data: any) => {
    //     this.event = data;
    //     console.log("event:",data);
    //   },
       const eventId = this.route.snapshot.params['id'];
        this.eventService.getEventById(eventId).subscribe((data: Evenement) => {
          this.event = data;
          console.log("event:",data);
        });

       


    
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
