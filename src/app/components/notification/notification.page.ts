import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { NavbarComponent } from "../navbar/navbar.component";
import { IonicModule } from '@ionic/angular';  // For Ionic components
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
  standalone: true,
  imports: 
  [
    IonicModule, 
    CommonModule, 
    FormsModule,
    RouterLink, 
    NavbarComponent]
})
export class NotificationPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
