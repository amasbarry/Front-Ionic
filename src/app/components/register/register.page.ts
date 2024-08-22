import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { Role, Utilisateur } from 'src/app/models/utilisateurmodel.component';
import { UtilisateurServiceService } from 'src/app/service/utilisateur-service.service';
import { RoleService } from 'src/app/service/role.service';
import { image } from 'ionicons/icons';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  utilisateurForm: FormGroup;
  utilisateurs: Utilisateur[] = [];
  // roles: Role[] = [];

  roless: any = [];
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
      image: [null, [Validators.required]],
      role: [4],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.isEditing && this.currentUserId !== null) {
      this.updateUser();
    } else {
      this.addUser();
    }
  }

  addUser(): void {
    if (this.utilisateurForm.valid) {
      const formValue = this.utilisateurForm.value;
      // formValue.role.id = 4;
      formValue.role = { id: 4 };
      const formData = new FormData();
      const clientPayload = { ...formValue };

      // Retirer le champ image de l'objet JSON
      delete clientPayload.image;

      formData.append('client', JSON.stringify(clientPayload));

      const imageFile = this.utilisateurForm.get('image')?.value;
      if (imageFile) {
        formData.append('image', imageFile);
      }

      this.utilisateurService.createUser(formData).subscribe({
        next: (data) => {
          this.utilisateurs.push(data);
          this.utilisateurForm.reset();
          this.router.navigate(["/succes"])
        },
        error: (err) => {
          console.error('Erreur lors de la création de user:', err);
        },
      });
    } else {
      console.log('Formulaire invalide');
    }
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.utilisateurForm.patchValue({ image: file });
      this.utilisateurForm.get('image')?.updateValueAndValidity();
    }
  }

  updateUser(): void {
    if (this.currentUserId !== null) {
      const updatedUser: Utilisateur = this.utilisateurForm.value;
      // updatedUser.role = { id: this.utilisateurForm.value.roleId } as Role; // Map roleId to role object
      this.utilisateurService
        .updateUser(this.currentUserId, updatedUser)
        .subscribe(
          (data) => {
            const index = this.utilisateurs.findIndex(
              (u) => u.id === this.currentUserId
            );
            if (index !== -1) {
              this.utilisateurs[index] = data;
            }
            this.utilisateurForm.reset();
            this.isEditing = false;
            this.currentUserId = null;
          },
          (error) => console.error(error)
        );
    }
  }

  deleteUser(id: number): void {
    this.utilisateurService.deleteUser(id).subscribe(
      () => (this.utilisateurs = this.utilisateurs.filter((u) => u.id !== id)),
      (error) => console.error(error)
    );
  }

  togglePasswordVisibility() {
  // Récupérer les éléments
  const passwordInput = document.getElementById('passwordInput') as HTMLInputElement;
  const showIcon = document.getElementById('show');
  const hideIcon = document.getElementById('hide');

  if (passwordInput && showIcon && hideIcon) {  // Vérifier que les éléments ne sont pas null
    if (passwordInput.type === 'password') {
      // Changer le type de l'input en text
      passwordInput.type = 'text';
      // Cacher l'icône "show" et afficher l'icône "hide"
      showIcon.style.display = 'none';
      hideIcon.style.display = 'inline';
    } else {
      // Changer le type de l'input en password
      passwordInput.type = 'password';
      // Afficher l'icône "show" et cacher l'icône "hide"
      showIcon.style.display = 'inline';
      hideIcon.style.display = 'none';
    }
  }
}
}
