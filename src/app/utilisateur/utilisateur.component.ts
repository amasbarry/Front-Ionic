import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Role, Utilisateur } from '../models/utilisateurmodel.component';
import { UtilisateurServiceService } from '../service/utilisateur-service.service';
import { RoleService } from '../service/role.service';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';


@Component({
  selector: 'app-utilisateur',
  standalone: true,
  imports: [CommonModule,FormsModule, ReactiveFormsModule, HttpClientModule, IonicModule],
  templateUrl: './utilisateur.component.html',
  styleUrl: './utilisateur.component.css',
  
})
export class UtilisateurComponent implements OnInit {
  utilisateurForm: FormGroup;
  utilisateurs: Utilisateur[] = [];
  roles: Role[] = [];

  roless : any =[]
  isEditing: boolean = false;
  currentUserId: number | null = null;

  constructor(
    private utilisateurService: UtilisateurServiceService,
    private roleservice: RoleService,
    private fb: FormBuilder
  ) {
    this.utilisateurForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required],
      motDePasse: ['', Validators.required],
      roleId: [4]
    });
  }

  ngOnInit(): void {
   
  }

  

  onSubmit(): void {
    if (this.isEditing && this.currentUserId !== null) {
      this.updateUser();
    } else {
      this.addUser();
    }
  }

  addUser(): void {
    const newUser: Utilisateur = this.utilisateurForm.value;
    newUser.role = { id: this.utilisateurForm.value.roleId } as Role; // Map roleId to role object
    this.utilisateurService.createUser(newUser).subscribe(
      data => {
        this.utilisateurs.push(data);
        this.utilisateurForm.reset();
      },
      error => console.error(error)
    );
  }

 
  
  editUser(user: Utilisateur): void {
    this.isEditing = true;
    this.currentUserId = user.id !== undefined ? user.id : null;
    this.utilisateurForm.patchValue({
      ...user
    });
  }

  updateUser(): void {
    if (this.currentUserId !== null) {
      const updatedUser: Utilisateur = this.utilisateurForm.value;
     // updatedUser.role = { id: this.utilisateurForm.value.roleId } as Role; // Map roleId to role object
      this.utilisateurService.updateUser(this.currentUserId, updatedUser).subscribe(
        data => {
          const index = this.utilisateurs.findIndex(u => u.id === this.currentUserId);
          if (index !== -1) {
            this.utilisateurs[index] = data;
          }
          this.utilisateurForm.reset();
          this.isEditing = false;
          this.currentUserId = null;
        },
        error => console.error(error)
      );
    }
  }
  

  deleteUser(id: number): void {
    this.utilisateurService.deleteUser(id).subscribe(
      () => this.utilisateurs = this.utilisateurs.filter(u => u.id !== id),
      error => console.error(error)
    );
  }


}