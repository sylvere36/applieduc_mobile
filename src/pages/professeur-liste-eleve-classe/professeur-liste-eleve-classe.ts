import { Component } from '@angular/core';
import { IonicPage, 
		NavController, 
		NavParams, 
		ActionSheetController, 
		ModalController } from 'ionic-angular';

import { ProfesseurInsertNotePage } from "../professeur-insert-note/professeur-insert-note";
import { ModalDetailNoteEleveComponent } from '../../components/modal-detail-note-eleve/modal-detail-note-eleve';
@IonicPage()
@Component({
  selector: 'page-professeur-liste-eleve-classe',
  templateUrl: 'professeur-liste-eleve-classe.html',
})
export class ProfesseurListeEleveClassePage {


  Trimestre: any;
  Nom = [
  	"BOKO Solange",
	"NOUDEGBE Jean de Dieu",
	"KANSOUKPA Roland",
	"HINDE Paulo",
	"AFFOKPE Paulos",
	"KANDEVIE John",
	"ASSOGBA Balle",
	"HINDEWE Prince"
  ];

  constructor(public navCtrl: NavController, 
  			public navParams: NavParams,
  			private actionSheet: ActionSheetController,
  			private modalCtrl: ModalController) {
  	this.Trimestre = this.navParams.get('trimestre');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfesseurListeEleveClassePage');
  }

  newNote()
  {
  	const actionsheet = this.actionSheet.create({
  		title: 'Choisissez le type de note à entrer',
	    buttons: [
	        {
	          text: 'Note d\'Interrogation',
	  
	          handler: () => {
	            this.navCtrl.push(ProfesseurInsertNotePage,
	            	{
	            		Nom: this.Nom,
	            		typeNote: 'Interrogation'
	            	});
	          }
	        },
	        {
	          text: 'Note de Devoir',
	          handler: () => {
	            this.navCtrl.push(ProfesseurInsertNotePage,
	            	{
	            		Nom: this.Nom,
	            		typeNote: 'Devoir'
	            	});
	          }
	        }
	      ]

  	});

  	actionsheet.present();
  }


  afficherNoteEleve(nom)
  {
  	const modal = this.modalCtrl.create(ModalDetailNoteEleveComponent,
  		{
  			nom: nom
  		});
    modal.present();
  }

}
