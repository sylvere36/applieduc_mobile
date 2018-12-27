import { Network } from '@ionic-native/network';
import { Api } from './../../providers/api/api';
import { Component } from '@angular/core';
import { ViewController, NavParams, AlertController, Platform } from 'ionic-angular';

@Component({
  selector: 'modal-detail-note-eleve',
  templateUrl: 'modal-detail-note-eleve.html'
})
export class ModalDetailNoteEleveComponent {

	nom: string;
	infoEleve: any;
	noteInterro: any;
	noteDevoir: any;
	errormessage: any;

  	constructor(private params: NavParams,
				  public viewCtrl: ViewController,
				  private alertCtrl: AlertController,
				  private api: Api,
				  private network: Network,
				  private plateform: Platform) {
		this.infoEleve = this.params.get("infoEleve");
		this.nom = this.infoEleve.nom;
		
		
	}

	dismiss()
	{
		this.viewCtrl.dismiss();
	}

	getdetailnote()
	{
		this.api.get('professeur/note_eleve/Interrogation', this.infoEleve).subscribe((data: any) => {
			if(data.status == true)
			{
				this.noteInterro = data.data;
			}
		}, err => 
		{
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
					  this.getdetailnote();
					}
				  }
				]
			  });
			  alert.present();
		});

		this.api.get('professeur/note_eleve/Devoir', this.infoEleve).subscribe((data: any) => {
			if(data.status == true)
			{
				this.noteDevoir = data.data;
			}
		}, err => 
		{
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
					  this.getdetailnote();
					}
				  }
				]
			  });
			  alert.present();
			  
		});


		
	}



}
