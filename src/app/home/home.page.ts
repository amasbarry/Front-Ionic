import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, } from '@ionic/angular/standalone';
import{IonicModule} from '@ionic/angular';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';
// import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterOutlet, RouterLink,NgIf],
})
export class HomePage implements OnInit {
  // user: any = null;

  constructor() {}
  ngOnInit() {}

  currentDiv = 1; // Commence par le premier div

  goToNextDiv(divNumber: number) {
    this.currentDiv = divNumber;
  }
}
