import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterLink
  ]
})
export class NotificationPage implements OnInit {
  notifications: {
    id: number;
    message: string | null;
    dateEnvoi: string | null
  }[] = [];

  constructor(
    private router: Router,
    private notificationsService: NotificationService
  ) { }

  ngOnInit() {
    this.loadNotifications();
  }
  redirectToHome(){
    this.router.navigate(['/accueil']);
  }

  loadNotifications() {
    this.notificationsService.getAllNotif().subscribe((data: { id: number; message: string | null; dateEnvoi: string | null }[]) => {
      this.notifications = data;
    }, (error) => {
      console.error('Error fetching notifications:', error);
    });
  }
}
