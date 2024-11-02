import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CrudServiceService } from 'src/app/service/crud-service.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss'],
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    RouterModule,
    NgFor,
    FormsModule,
    ReactiveFormsModule,
    NgClass,
  ],
})
export class InscriptionComponent implements OnInit {
  isPasswordVisible = false;
  selectedImage: string | ArrayBuffer | null = null;

  clientForm: FormGroup;
  edit: boolean = false;
  currentUser: any;
  selectedFile: File | null = null;
  Erreur: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private crudService: CrudServiceService,
    private router: Router
  ) {
    this.clientForm = this.formBuilder.group({
      nom: ['', [Validators.required]],
      prenom: ['', [Validators.required]],
      // email: ['', [Validators.email]],
      telephone: [
        '',
        [Validators.required, Validators.minLength(8), Validators.maxLength(8)],
      ],
      password: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(8)],
      ],
      // image: [null, [Validators.required]],
    });
  }

  ngOnInit() {}

  // onFileChange(event: any): void {
  //   const file = event.target.files[0];
  //   if (file) {
  //     this.clientForm.patchValue({ image: file });
  //     this.clientForm.get('image')?.updateValueAndValidity();
  //   }
  // }

  AddClient() {
    if (this.clientForm.valid) {
      // Evene.utilisateur = { id: this.currentUserId } as Utilisateur
      // this.clientForm.value.utilisateur = { id: this.currentUserId };
      const formValue = this.clientForm.value;
      // formValue.utilisateur.id = this.currentUserId;
      const formData = new FormData();
      const client = { ...formValue };

      // Retirer le champ image de l'objet JSON
      //delete client.image;

      formData.append('client', JSON.stringify(client));
      console.log(client);
      if(this.selectedFile){
        formData.append('image', this.selectedFile);
        console.log(this.selectedFile);
      }
      // formData.append('image', this.formGroup.get('image')?.value);

      this.crudService.AddClient(formData).subscribe({
        next: (data) => {
          if(data === 1){
            console.log(data);
            this.Erreur = "Un utilisateur exixte avec ce numéro"
          }else{
            this.clientForm.reset();
            this.router.navigate(['/login']);
          }
          
        },
        error: (err) => {
          console.error("Erreur lors de l'ajout du client':", err);
        },
      });
    } else {
      console.log('Formulaire invalide');
      this.Erreur = "Remplissez correctement tout les champs";
    }
  }

  togglePassword() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];

      // Lire le fichier pour afficher l'aperçu
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result as string | ArrayBuffer;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }
}
