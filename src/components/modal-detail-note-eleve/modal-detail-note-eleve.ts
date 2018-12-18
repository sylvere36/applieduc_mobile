import { Api } from './../../providers/api/api';
import { Component } from '@angular/core';
import { ViewController, NavParams, AlertController } from 'ionic-angular';

@Component({
  selector: 'modal-detail-note-eleve',
  templateUrl: 'modal-detail-note-eleve.html'
})
export class ModalDetailNoteEleveComponent {

	nom: string;
	infoEleve: any;
	noteInterro: any;
	noteDevoir: any;

  	constructor(private params: NavParams,
				  public viewCtrl: ViewController,
				  private alertCtrl: AlertController,
				  private api: Api) {
		this.infoEleve = this.params.get("infoEleve");
		this.nom = this.infoEleve.nom;
		
		this.api.get('professeur/note_eleve/Interrogation', this.infoEleve).subscribe((data: any) => {
			if(data.status == true)
			{
				this.noteInterro = data.data;
			}
		}, err => 
		{
			let alert = this.alertCtrl.create({
				title: 'Error of get api',
				subTitle: err.message,
				buttons: ['Quitter']
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
			let alert = this.alertCtrl.create({
				title: 'Error of get api',
				subTitle: err.message,
				buttons: ['Quitter']
			});
			alert.present();
		});
	}

	dismiss()
	{
		this.viewCtrl.dismiss();
	}



}
