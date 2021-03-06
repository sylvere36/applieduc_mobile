import { Network } from '@ionic-native/network';
import { Api } from './../../providers/api/api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ModalController, LoadingController, AlertController, Platform } from 'ionic-angular';

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
	terms: any;
	eleves = [];
	errormessage: any;

  constructor(public navCtrl: NavController, 
  			public navParams: NavParams,
  			private actionSheet: ActionSheetController,
				private modalCtrl: ModalController,
				private loadingCtrl: LoadingController,
				private alertCtrl: AlertController,
				private api: Api,
				private plateform: Platform,
				private network: Network) {
		this.nom_periode = this.navParams.get('type');
		this.donneeId = this.navParams.get('donneeId');
		this.classe = this.donneeId.CLASSE + " " + this.donneeId.TYPE_CLASSE;
  }

  ionViewWillEnter(){
		this.initializeClass();
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
	
	
	initializeClass() 
	{
		let loading = this.loadingCtrl.create({
			content: "Veuillez patienter svp !!!"
		});
		
		this.result = this.api.get('professeur/eleves/'+ this.donneeId.ID_CLASSE);
		this.result.subscribe((res) => {
			if (res.status == true) {
				this.eleves = res.data;
			}
		}, err => {
			if (this.network.type == 'none' ) { 
				this.errormessage = "Veuillez verifier votre connexion internet";
			  } else {
				this.errormessage = err.message;
			  }
			  
			  let alert = this.alertCtrl.create({
				title: 'Problème de connection',
				subTitle: this.errormessage,
				buttons: [
				  {
					text: 'Quitter',
					handler: () => {
					  this.plateform.exitApp();
					}
				  },
				  {
					text: 'Réessayer',
					handler: () => {
					  this.initializeClass();
					}
				  }
				]
			  });
			  
			  setTimeout(function(){
				loading.dismiss();
				alert.present();
			  }, 10000);
		});
	}

}
