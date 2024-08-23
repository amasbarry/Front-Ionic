import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  standalone: true,
  imports: [RouterOutlet, RouterLink, NavbarComponent],
})
export class SearchComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
