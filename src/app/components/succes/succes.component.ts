import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';  // For Ionic components

@Component({
  selector: 'app-succes',
  templateUrl: './succes.component.html',
  styleUrls: ['./succes.component.scss'],
  standalone: true,
  imports: 
  [
    IonicModule,       
    CommonModule,      
    FormsModule,       
    RouterModule,
    RouterLink       
  ]
})
export class SuccesComponent  implements OnInit {
  router: any;

  constructor(
    router: Router,
  ) { }

  ngOnInit() {

    this.router.navigate
  }

}
