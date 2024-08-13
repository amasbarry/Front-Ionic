import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { heart, logoApple,
   settingsSharp,
   star,notificationsOutline,
   searchOutline,
   medalOutline,
   micOffOutline,
   mic,
   easelOutline,  
   radioOutline, 
   calendarOutline,
   homeOutline,
   personOutline 
  } from 'ionicons/icons';
import { NavbarComponent } from '../navbar/navbar.component';



@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.scss'],
  standalone: true,
  imports: 
  [RouterModule,
    IonicModule,
    RouterLink,
    NavbarComponent
  ],
})
export class AcceuilComponent implements OnInit {

  slides: any[] = [];
  constructor() { 
    addIcons({
    heart, logoApple,
    settingsSharp, star,
    notificationsOutline,
    searchOutline,micOffOutline,
    medalOutline,mic,
    easelOutline, 
    radioOutline,
    calendarOutline,
    personOutline,
    homeOutline 
  });
  }
  ngOnInit(): void {
    this.slides = [
      {
        image: 'assets/icon/fra.png',
        title: 'Bienvenue',
        description: 'Découvrez nos offres et services exclusifs.'
      },
      {
        image: 'assets/icon/aya.png',
        title: 'Professionnels de la santé',
        description: 'Retrouvez tous les professionnels de la santé qui sont prêts à vous accompagner.'
      },
      {
        image: 'assets/icon/faiza.jpeg',
        title: 'Services de soins',
        description: 'Découvrez tous nos services de soins qui vous sont proposés.'
      },
    ];
    
  }


}
