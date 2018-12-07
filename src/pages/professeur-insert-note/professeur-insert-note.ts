import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { NoteEleve } from '../../models/note';

@IonicPage()
@Component({
  selector: 'page-professeur-insert-note',
  templateUrl: 'professeur-insert-note.html',
})
export class ProfesseurInsertNotePage {
	typeNote: string;
	Nom: any;
	noteDesEleves: NoteEleve[] = [];
	nomReturn: any;
	noteEleve: NoteEleve = {idEleve: "", note: 0};

  constructor(public navCtrl: NavController, 
  				public navParams: NavParams) {
  	this.Nom = this.navParams.get("Nom");
  	this.typeNote = this.navParams.get("typeNote");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfesseurInsertNotePage');
  }

  ajoutNote(note: number, index:number)
  {
  	this.nomReturn = this.Nom[index];
  	this.noteEleve = {idEleve: "", note: 0};
  	this.noteEleve = {idEleve: this.nomReturn, note: note};

  	console.log(this.noteEleve);

  	this.noteDesEleves.push(this.noteEleve);
  }

  validerNote()
  {
  	console.log(this.noteDesEleves);
  }

}
