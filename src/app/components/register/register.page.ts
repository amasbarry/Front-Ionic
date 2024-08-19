import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { Role, Utilisateur } from 'src/app/models/utilisateurmodel.component';
import { UtilisateurServiceService } from 'src/app/service/utilisateur-service.service';
import { RoleService } from 'src/app/service/role.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule
  ],
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage {
  // fullName: string = '';
  // email: string = '';
  // password: string = '';
  // confirmPassword: string = '';

  // constructor() {}

  // register() {
  //   if (this.password === this.confirmPassword) {
  //     // Implement your registration logic here
  //     console.log('User registered:', this.fullName, this.email);
  //   } else {
  //     console.error('Passwords do not match');
  //   }
  // }


  utilisateurForm: FormGroup;
  utilisateurs: Utilisateur[] = [];
  roles: Role[] = [];

  roless : any =[]
  isEditing: boolean = false;
  currentUserId: number | null = null;

  constructor(
    private utilisateurService: UtilisateurServiceService,
    private roleservice: RoleService,
    private router: Router,
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
      console.log(this.addUser());
    }
  }

  addUser(): void {
    const newUser: Utilisateur = this.utilisateurForm.value;
    newUser.role = { id: this.utilisateurForm.value.roleId } as Role; // Map roleId to role object
    this.utilisateurService.createUser(newUser).subscribe(
      data => {
        this.utilisateurs.push(data);
        this.utilisateurForm.reset();
        console.log("Client ajouter avec success!!!");
        this.router.navigate(['/login']);
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