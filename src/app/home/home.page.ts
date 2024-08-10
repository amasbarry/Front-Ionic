import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, } from '@ionic/angular/standalone';
import{IonicModule} from '@ionic/angular';
import { RouterLink, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule,RouterOutlet,RouterLink],
})
export class HomePage {
  constructor() {}
}
