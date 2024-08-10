import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet,NavbarComponent,RouterOutlet,RouterLink],
})
export class AppComponent {
  constructor() {}
}
