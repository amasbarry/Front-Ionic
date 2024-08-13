import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
  standalone: true,
  imports: [RouterOutlet, RouterLink,NavbarComponent],
})
export class EventsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}