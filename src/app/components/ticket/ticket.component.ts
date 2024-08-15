import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss'],
  standalone: true,
  imports:[RouterLink,RouterOutlet],
})
export class TicketComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
