import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { NavbarComponent } from "../navbar/navbar.component";  
@Component({
  selector: 'app-politique',
  templateUrl: './politique.page.html',
  styleUrls: ['./politique.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    NgIf,
    NgFor,
    RouterLink,
    CommonModule,
    FormsModule,
    NavbarComponent
]
})
export class PolitiquePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
