import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TriviaClass } from './TriviaClass';
import { Bonbon } from './bonbon';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  lat: number;
  lng: number;
  i = 0;
  numAdress = 1;
  timerHours = [
    '17H00',
    '17H30',
    '18H00',
    '18H30',
    '19H00',
    '19H30',
    '20H00',
    '21H00',
    '21H30',
    '22H00',
    '22H30'
    // '23H00',
    // '23H30',
    // '00H00'
  ];

  constructor(private http: HttpClient) { }

  tableauSucettes: Bonbon[] = [];
  tableauMarshmallows: Bonbon[] = [];
  tableauBonbonsGelifies: Bonbon[] = [];
  tableauMeringuesFantaisie: Bonbon[] = [];

  bonbonWinSwitch: Boolean = true;

  bonbonCounter = 0;


  getTableauCandy(category) {
    this.http.get<any>(`https://fr.openfoodfacts.org/categorie/${category}/${Math.floor((Math.random() * 5) + 1)}.json`)
    .subscribe((data) => {
      const obj = data.products;
      // Boucle pour instancier les cinq premiers objet du JSON en classe Bonbon
      for (let i = 0; i < 5; i++) {
        const unBonbon = new Bonbon(obj[i].product_name_fr, category, false );
        switch (category) {
          case 'sucettes':
            this.tableauSucettes.push(unBonbon);
            break;
          case 'marshmallows':
            this.tableauMarshmallows.push(unBonbon);
            break;
          case 'bonbons-gelifies':
            this.tableauBonbonsGelifies.push(unBonbon);
            break;
        }
      }
    });
  }

  getTableauMerinques(category) {
    this.http.get<any>(`https://fr.openfoodfacts.org/categorie/${category}/1.json`)
    .subscribe((data) => {
      const obj = data.products;
      // Boucle pour instancier les cinq premiers objet du JSON en classe Bonbon
      for (let i = 0; i < 5; i++) {
        const unBonbon = new Bonbon(obj[i].product_name_fr, category, false );
        this.tableauMeringuesFantaisie.push(unBonbon);
      }
    });

  }


  getTimer() {
  this.i++;
  return this.timerHours[this.i - 1];

}

  getTrivia() {
      return this.http.get<any>('https://opentdb.com/api.php?amount=1&category=9&difficulty=easy');
  }

  getAddress(lat, long) {
    this.lat = lat;
    this.lng = long;
    const address = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&key=4e73016747394b95922ddd5fa3df9fb5`;
    return this.http.get<any>(address);
  }

  changeNumberAdress() {
    this.numAdress = this.numAdress + 2;
  }

  getNumberAdress() {
    return this.numAdress;
  }

}
