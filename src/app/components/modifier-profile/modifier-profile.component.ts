import { Component, OnInit } from '@angular/core';

import { Router, RouterLink, RouterOutlet } from '@angular/router';

import { addIcons } from 'ionicons';
import { cloudUploadOutline, personOutline } from 'ionicons/icons';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { NgIf } from '@angular/common';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonicModule, IonIcon, IonImg, IonItem, IonLabel } from '@ionic/angular';
import { IonInput } from '@ionic/angular/standalone';

import { Evenement } from 'src/app/models/Evenement';
import { Role, Utilisateur } from 'src/app/models/utilisateurmodel.component';
import { AuthService } from 'src/app/service/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UtilisateurServiceService } from 'src/app/service/utilisateur.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { HomePage } from 'src/app/home/home.page';

@Component({
  selector: 'app-modifier-profile',
  templateUrl: './modifier-profile.component.html',
  styleUrls: ['./modifier-profile.component.scss'],
  standalone: true,
  imports: 
  [
    IonicModule,
    RouterOutlet, 
    RouterLink,
    NavbarComponent,
    HomePage,
    NgIf,
    ReactiveFormsModule
  ],
})
export class ModifierProfileComponent implements OnInit {
  selectedImage: string | undefined;
  private router: Router;
  user: any;
  event: Evenement[] = [];
  profileForm: FormGroup;
  currentUser: Utilisateur | undefined;
  passwordFieldType: string = 'password';

  
  
  constructor(
    router: Router,
    private authService: AuthService,
    private fb: FormBuilder,
    private utilisateurService: UtilisateurServiceService
  ) {
    this.router = router;
    addIcons({ personOutline, cloudUploadOutline });
    this.profileForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required],
      motDePasse: ['', Validators.required],
      role: [3, Validators.required],
    });


  }

  ngOnInit(): void {
    const user = this.authService.getUser();
    if (user) {
      this.currentUser = user;
      this.user = user; // Ajoutez cette ligne pour assigner `user`
      this.profileForm.patchValue({
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        telephone: user.telephone,
        motDePasse: user.motDePasse,
        role:4,
      });
      console.log("User récupéré avec succès:", user.role.role);
    } else {
      console.error('Erreur: utilisateur non trouvé');
    }
  }
  
  
  
  logout() {
    this.authService.clearUser();
    this.router.navigate(['/home']);
  }

  onSubmit(): void {
    if (this.profileForm.valid && this.user) {
      const updatedUser: Utilisateur = { ...this.user, ...this.profileForm.value };
      updatedUser.role = { id: this.profileForm.value.role } as Role;
  
      this.utilisateurService.updateUser(this.user.id, updatedUser).subscribe({
        next: (response) => {
          console.log("Profil mis à jour avec succès !!!", response);
  
          // Mettez à jour les informations utilisateur stockées localement
          this.authService.updateStoredUser(response);
  
          // Mettez à jour le formulaire avec les nouvelles valeurs
          this.profileForm.patchValue({
            nom: response.nom,
            prenom: response.prenom,
            email: response.email,
            telephone: response.telephone,
            motDePasse: response.motDePasse,
            role: response.role.id,
          });
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour du profil', err);
        }
      });
    } else {
      console.error('Formulaire invalide ou utilisateur non trouvé');
    }
  }
  
  
  

  
  getUserInfo() {
    const user = this.authService.getUser();
    console.log('User Info:', user);
  }
  

  async selectionImage() { // Nom de la fonction en camelCase
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt,
    });

    this.selectedImage = image.dataUrl;
  }
  togglePasswordVisibility(): void {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }





}

