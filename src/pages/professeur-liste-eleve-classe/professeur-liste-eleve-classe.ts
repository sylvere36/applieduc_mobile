import { Api } from './../../providers/api/api';
import { Component } from '@angular/core';
import { IonicPage, 
		NavController, 
		NavParams, 
		ActionSheetController, 
		ModalController, LoadingController, AlertController } from 'ionic-angular';

import { ProfesseurInsertNotePage } from "../professeur-insert-note/professeur-insert-note";
import { ModalDetailNoteEleveComponent } from '../../components/modal-detail-note-eleve/modal-detail-note-eleve';
@IonicPage()
@Component({
  selector: 'page-professeur-liste-eleve-classe',
  templateUrl: 'professeur-liste-eleve-classe.html',
})
export class ProfesseurListeEleveClassePage {


	nom_periode: any;
	donneeId: any;
	result: any;
	classe: any;
  eleves = [];

  constructor(public navCtrl: NavController, 
  			public navParams: NavParams,
  			private actionSheet: ActionSheetController,
				private modalCtrl: ModalController,
				private loadingCtrl: LoadingController,
				private alertCtrl: AlertController,
				private api: Api) {
		this.nom_periode = this.navParams.get('type');
		this.donneeId = this.navParams.get('donneeId');
		this.classe = this.donneeId.CLASSE + " " + this.donneeId.TYPE_CLASSE;
  }

  ionViewWillEnter(){
		let loading = this.loadingCtrl.create({
			content: "Veuillez patienter svp !!!"
		});
		loading.present();
		this.result = this.api.get('professeur/eleves/'+ this.donneeId.ID_CLASSE);
		this.result.subscribe((res) => {
					loading.dismiss();
					if (res.status == true) {
						this.eleves = res.data;
					}
				}, err => {
					let alert = this.alertCtrl.create({
						title: 'Error of get api',
						subTitle: err.message,
						buttons: ['Quitter']
					});
					alert.present();
					console.error('ERROR', err);
				});
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
									eleves: this.eleves,
									infoclasse: this.donneeId,
									typeNote: 'Interrogation',
									nom_periode: this.nom_periode
	            	});
	          }
	        },
	        {
	          text: 'Note de Devoir',
	          handler: () => {
	            this.navCtrl.push(ProfesseurInsertNotePage,
	            	{
									eleves: this.eleves,
									infoclasse: this.donneeId,
	            		typeNote: 'Devoir',
									nom_periode: this.nom_periode
	            	});
	          }
	        }
	      ]

  	});

  	actionsheet.present();
  }


  afficherNoteEleve(nom, id_eleve)
  {
  	this.modalCtrl.create(ModalDetailNoteEleveComponent,
  		{
				infoEleve:
				{
					nom: nom,
					id_eleve: id_eleve,
					id_classe: this.donneeId.ID_CLASSE,
					id_matiere: this.donneeId.ID_MATIERE,
					type_periode: this.donneeId.TYPE_PERIODE,
					nom_periode: this.nom_periode
				} 
  		} , { cssClass: 'inset-modal' }).present();
  }

}
