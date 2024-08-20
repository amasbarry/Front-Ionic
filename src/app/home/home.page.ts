import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, } from '@ionic/angular/standalone';
import{IonicModule} from '@ionic/angular';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule,RouterOutlet,RouterLink],
})
export class HomePage implements OnInit{

  user: any = null;
  
  constructor(private authService: AuthService,) {}
  ngOnInit() {
    this.user = this.authService.getUser(); // Récupérer les informations de l'utilisateur
  }

}
