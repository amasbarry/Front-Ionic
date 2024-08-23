import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';
import { NotificationService } from 'src/app/service/notification.service';
import {AuthService} from "../../service/auth.service";
import {Utilisateur} from "../../models/utilisateurmodel.component";

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
  user: Utilisateur | null = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    private notificationsService: NotificationService
  ) { }

  ngOnInit() {
    this.user = this.authService.getUser();
    this.loadNotifications(this.user?.id);

  }
  redirectToHome(){
    this.router.navigate(['/accueil']);
  }

  loadNotifications(id:any) {
    this.notificationsService.getAllNotif(id).subscribe((data: { id: number; message: string | null; dateEnvoi: string | null }[]) => {
      this.notifications = data;
    }, (error) => {
      console.error('Error fetching notifications:', error);
    });
  }
}
