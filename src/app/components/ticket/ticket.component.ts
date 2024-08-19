import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import {LitleService} from "../../service/Litle.service";
import {DataService} from "../../service/DataTransfer";
import {AuthService} from "../../service/auth.service";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss'],
  standalone: true,
  imports: [RouterLink, RouterOutlet, NgForOf],
})
export class TicketComponent  implements OnInit {

  constructor(private authService: AuthService, private litleService: LitleService, private dataTransfer: DataService) { }

  currentUser = this.authService.getUser();
  codeQrImage:any
  data: any;
  ticket: any[] = [];

  ngOnInit() {
    this.authService.getUser();
    //this.GetQrCode;
    this.getBookingData();
    this.getTickets(this.data.eventId, this.currentUser?.email);
  }

  /*Elle est utiliser pour recupérer l'image de la base de donnéé*/
  /*GetQrCode(name: number){
    this.qrcodeService.getqrcode().subscribe(qrcode => {
      this.codeQrImage = qrcode;
    })
  }*/


  /*Cette fonction est utilisée pour revenir dans l'historique du navigateur*/
  back(){
    this.litleService.back()
  }

  /*recevoir les donnéés du composant reservation*/
  getBookingData(){
    this.dataTransfer.currentData.subscribe(data=> {
      this.data = data
      console.log(this.data);
      }
    )
  }

  async getTickets(id: any, email:any){
    try {
      const res = await fetch("http://localhost:8080/gestEvent/QrCode/fileSystem/"+email+"/List?id="+id+"")
      const results = await res.json();
      this.ticket = results;
      console.log(this.ticket);
    }catch (e){
      console.log(e);
    }
  }



}
