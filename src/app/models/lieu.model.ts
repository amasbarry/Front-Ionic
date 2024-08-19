export class Lieu {
    id: number;
    nameFile: string;
    filepath: string;
    ticketId: string;
    statutQrcode: StatutQrcode;
    reservation: Reservation;

    constructor(id: number, nameFile: string, filepath: string, ticketId: string, statutQrcode: StatutQrcode, reservation: Reservation) {
      this.id = id;
      this.nameFile = nameFile;
      this.filepath = filepath;
      this.ticketId = ticketId;
      this.statutQrcode = statutQrcode;
      this.reservation = reservation;
    }
  }

export class StatutQrcode {
  id: number;
  statut: string;

  constructor(id: number, statut: string) {
    this.id = id;
    this.statut = statut;
  }
}

export class Reservation {
  id: number;

  constructor(id: number) {
    this.id = id;
  }
}
