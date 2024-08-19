import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import {NgFor} from "@angular/common";

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
  standalone: true,
  imports: [RouterOutlet, RouterLink, NavbarComponent,NgFor],
})
export class EventsComponent implements OnInit {

  events = [
    { title: 'Concert titre 1', lieu: 'Bamako', category: 'Concert', prix: 2000, image: '../../../assets/icon/Rectangle 4395.png' },
    { title: 'Concert titre 2', lieu: 'Bamako', category: 'Concert', prix: 2500, image: '../../../assets/icon/Rectangle 4395.png' },
    { title: 'Cérémonie titre 1', lieu: 'Bamako', category: 'Ceremonie', prix: 3000, image: '../../../assets/icon/Rectangle 4395.png' },
    { title: 'Exposition titre 1', lieu: 'Bamako', category: 'Exposition', prix: 1500, image: '../../../assets/icon/Rectangle 4395.png' }
  ];

  selectedCategory: string | null = null;

  constructor() {}

  ngOnInit() {}

  filterEventsByCategory(): any[] {
    if (!this.selectedCategory) {
      return this.events;
    }
    return this.events.filter(event => event.category === this.selectedCategory);
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
  }
}
