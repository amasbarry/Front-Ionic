import { Location, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-notif',
  templateUrl: './notif.component.html',
  styleUrls: ['./notif.component.scss'],
  standalone: true,
  imports: [RouterLink, NgIf, HeaderComponent],
})
export class NotifComponent implements OnInit {
  notif = false;

  constructor(private location: Location) {}

  ngOnInit() {}

  Ouvre() {
    this.notif = true;
  }
  Ferme() {
    this.notif = false;
  }
  goBack() {
    this.location.back();
  }
}
