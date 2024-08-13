import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonButtons, IonGrid } from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.page.html',
  styleUrls: ['./ticket-detail.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule,NavbarComponent]
})
export class TicketDetailPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
