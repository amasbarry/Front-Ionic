import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss'],
  standalone: true,
  imports: [RouterLink,RouterOutlet,NavbarComponent],
})
export class AccueilComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
