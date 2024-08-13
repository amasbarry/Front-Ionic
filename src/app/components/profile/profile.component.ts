import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { HomePage } from '../../home/home.page';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [RouterOutlet, RouterLink, NavbarComponent, HomePage],
})
export class ProfileComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
