import { Api } from './../../providers/api/api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';

import { NoteEleve } from '../../models/note';

@IonicPage()
@Component({
  selector: 'page-professeur-insert-note',
  templateUrl: 'professeur-insert-note.html',
})
export class ProfesseurInsertNotePage {
	typeNote: string;
	nom_periode: any;
	eleves: any;
	noteDesEleves: NoteEleve[] = [];
	infoclasse:any;
	id_eleve: any;
	noteEleve: NoteEleve = {idEleve: "", note: 0};
	data: {};

  constructor(public navCtrl: NavController, 
					public navParams: NavParams,
					private alertCtrl: AlertController,
					private loading: LoadingController,
					private toastCtrl: ToastController,
					private api: Api) {
		this.eleves = this.navParams.get("eleves");
		this.nom_periode = this.navParams.get("nom_periode");
  	this.infoclasse = this.navParams.get("infoclasse");
  	this.typeNote = this.navParams.get("typeNote");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfesseurInsertNotePage');
  }

  ajoutNote(note: number, index:number)
  {
  	this.id_eleve = this.eleves[index].id;
		this.noteEleve = {idEleve: "", note: 0};

		for (var i = 0; i < this.noteDesEleves.length; i++) {
			if (this.noteDesEleves[i].idEleve === this.id_eleve) {
				this.noteDesEleves[i].note = note;
				return;
			}
		}
		this.noteEleve = {idEleve: this.id_eleve, note: note};
		this.noteDesEleves.push(this.noteEleve);
  }

  validerNote()
  {
		if(this.noteDesEleves.length != this.eleves.length)
		{
			let alert = this.alertCtrl.create({
				title: 'Erreur',
				subTitle: "Vous n'avez pas renseigner la note de tout les élèves.",
				buttons: ['Quitter']
			});
			alert.present();
			return;
		}

		for (var i = 0; i < this.noteDesEleves.length; i++) {
			if (this.noteDesEleves[i].note < 0 || this.noteDesEleves[i].note > 20 || this.noteDesEleves[i].note == null) {
				let alert = this.alertCtrl.create({
					title: 'Erreur',
					subTitle: "Veuillez reverifier les notes.",
					buttons: ['Quitter']
				});
				alert.present();
				return;
			}
		}

		this.data = 
		{
			id_classe: this.infoclasse.ID_CLASSE,
			id_matiere: this.infoclasse.ID_MATIERE,
			id_classe_matiere: this.infoclasse.ID_CLASSE_MATIERE,
			id_annee: this.infoclasse.ID_ANNEE,
			classe_matiere_professeur_annee_id: this.infoclasse.ID_CLASSE_MATIERE_PROFESSEUR_ANNEE,
			type_note: this.typeNote,
			nom_periode: this.nom_periode,
			note_id: this.noteDesEleves
		};

		this.api.post('professeur/ajoutnote', this.data).then((result: any) => {
			
				if(result.status == true)
				{
					const toast = this.toastCtrl.create({
						message: 'Les notes ont été enrégistrés avec succès.',
						duration: 3000,
						position: 'top',
						cssClass: "toastSuccess"
					  });

					toast.present();
					this.navCtrl.pop();
				}else
				{
					let alert = this.alertCtrl.create({
						title: 'Erreur',
						subTitle: result.message,
						buttons: ['Quitter']
					});
					alert.present();
				}
			}, (err) => {
				let alert = this.alertCtrl.create({
					title: 'Erreur',
					subTitle: err.message,
					buttons: ['Quitter']
				});
				alert.present();
		});


  }

}
