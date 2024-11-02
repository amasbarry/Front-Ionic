import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { HeaderComponent } from '../header/header.component';
import { ActivatedRoute, Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CrudServiceService } from 'src/app/service/crud-service.service';
import { Reservation } from 'src/app/Models/Reservation';
import html2canvas from 'html2canvas'; // Importation d'html2canvas
import { Directory, Filesystem } from '@capacitor/filesystem';
import { Voyage } from 'src/app/Models/Voyage';
import { min } from 'rxjs';
import { CompagnieService } from 'src/app/service/compagnie.service';

@Component({
  selector: 'app-billet-detail',
  templateUrl: './billet-detail.component.html',
  styleUrls: ['./billet-detail.component.scss'],
  standalone: true,
  imports: [
    NavbarComponent,
    HeaderComponent,
    RouterLink,
    RouterOutlet,
    RouterModule,
    NgIf,
    NgFor,
    FormsModule,
    ReactiveFormsModule,
    NgClass,
  ],
})
export class BilletDetailComponent implements OnInit {
  reservationId = 0;
  reservation: Reservation | null = null;
  AnnulerForm!: FormGroup;
  add = false;
  ReservationCurrent?: number | null = null;
  non = false;
  succes = false;
  Message : string | null = null;

  constructor(
    private form: FormBuilder,
    private route: ActivatedRoute,
    private crudService: CrudServiceService,
    private compagnieService: CompagnieService,
    private router: Router
  ) {
    this.AnnulerForm = this.form.group({
      // DateVoyage: [, [Validators.required]],
      numPayement: [,
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(8),
          // Validators.pattern(/^\d{8}$/),
        ],
      ],
    });
  }

  ngOnInit() {
    this.reservationId = +this.route.snapshot.paramMap.get('id')!;
    this.getReservation();
  }

  cacher() {
    this.add = false;
    this.AnnulerForm.reset();
  }
  show(reservationId: number) {
    // if (this.token == null) {
    //   this.router.navigate(['/login']);
    // }

    this.ReservationCurrent = reservationId; // Stockez l'ID du voyage pour la réservation
    this.add = true;
  }

  Annuler() {
    if(this.AnnulerForm.valid){
        const numPayement = this.AnnulerForm.get('numPayement')?.value;
        this.crudService
          .AnnulerReservation(numPayement, this.ReservationCurrent!)
          .subscribe({
            next: (res) => {
              console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaa', res);
              if (res === 1) {
                this.succes = true;
              } else {
                this.non = true;
              }

              this.Message =null;
              // this.router.navigate(['/billet']);
              // this.router.navigate(['/billet']);
            },
          });
    }else{
      this.Message = 'Formulaire invalide'
    }
    
  }

  getReservation() {
    // Récupérer tous les voyages
    this.crudService.getReservationById(this.reservationId).subscribe({
      next: (data) => {
        this.reservation = data; // Stocker tous les voyages récupérés
        // this.filterVoyagesByDay();
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des voyages :', err);
      },
    });
  }

  // downloadBillet() {
  //   const billetElement = document.querySelector('.billet') as HTMLElement;
  //   if (billetElement) {
  //     html2canvas(billetElement).then((canvas) => {
  //       const imgData = canvas.toDataURL('image/png');
  //       const link = document.createElement('a');
  //       link.href = imgData;
  //       link.download = `billet_${this.reservation?.code}.png`;
  //       link.click();
  //     });
  //   }
  // }

  downloadBillet() {
    const billetElement = document.querySelector('.billet') as HTMLElement;
    if (billetElement) {
      html2canvas(billetElement).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');

        // Convert base64 data to binary
        const base64Data = imgData.split(',')[1];

        // Save the image using Capacitor Filesystem
        this.saveImage(base64Data);
      });
    }
  }

  async saveImage(base64Data: string) {
    try {
      const fileName = `billet_${this.reservation?.code}.png`;

      // Save the image to the gallery
      const result = await Filesystem.writeFile({
        path: fileName,
        data: base64Data,
        directory: Directory.Documents, // Or Directory.External in some cases
        recursive: true,
      });

      console.log('Image saved to:', result.uri);

      // To access it in the gallery, you might need to move it to a public folder if needed
    } catch (error) {
      console.error('Error saving image:', error);
    }
  }

  hidePayement() {
    this.add = false;
    this.non = false;
    this.succes = false;
    // this.router.navigate(['/billet']);
    this.AnnulerForm.reset();
  }
  ShowPayement() {
    this.add = true;
  }
}

