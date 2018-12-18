import { Api } from './../../providers/api/api';
import { NativeStorage } from '@ionic-native/native-storage';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, PopoverController, App, LoadingController, AlertController } from 'ionic-angular';

import { Profil } from '../../models/profil';
import { ProfesseurLoginPage } from '../professeur-login/professeur-login';
import { ProfesseurAcceuilPage } from '../professeur-acceuil/professeur-acceuil';

@IonicPage()
@Component({
  selector: 'page-professeur-profile',
  templateUrl: 'professeur-profile.html',
})
export class ProfesseurProfilePage {

  isReadyToSave: boolean;
  item: any;
  form: FormGroup;
  result: any;
  Professeur: any;
  ProfilProfesseur: Profil = 
                {profilpicture:"", nom: "",prenom:"", contact:"", email:"", adresse:"" };
  nomprofil: string;
  prenomprofil: string;
  setting_deconnexion = {type_user: "professeur",identifiant: "", logged:false };

  constructor(public navCtrl: NavController, 
  			  public navParams: NavParams,
  			  private formBuilder: FormBuilder,
          private popoverCtrl: PopoverController,
          private storage: NativeStorage,
          private loadingCtrl: LoadingController,
          private alertCtrl: AlertController,
          private api: Api,
          private app: App) {

  	this.form = formBuilder.group({
      profilePic: [''],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      contact: ['', Validators.required],
      email: ['', Validators.required],
      adresse: ['', Validators.required]
    });

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });

  }

  ionViewWillEnter(){
		let loading = this.loadingCtrl.create({
      		content: "Veuillez patienter svp !!!"
		});
		loading.present();
		this.storage.getItem('settings_user')
		.then(
			data => 
			{
				this.result = this.api.get('professeur/profil/'+ data.identifiant);
				this.result.subscribe((res) => {
					loading.dismiss();
					if (res.status == true) {
            this.nomprofil = res.data[0].nom;
            this.prenomprofil = res.data[0].prenom;
            this.ProfilProfesseur.profilpicture = this.nomprofil.charAt(0)+this.prenomprofil.charAt(0);
            this.ProfilProfesseur.nom = res.data[0].nom;
            this.ProfilProfesseur.prenom = res.data[0].prenom;
            this.ProfilProfesseur.contact = res.data[0].telephone;
            this.ProfilProfesseur.email = res.data[0].email;
            this.ProfilProfesseur.adresse = res.data[0].adresse;
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
			},
			error => 
			{
				loading.dismiss();
				let alert = this.alertCtrl.create({
								title: 'Error of get storage',
								subTitle: error.message,
								buttons: ['Quitter']
							});
							alert.present();
				console.error(error);
			}
		);
	}

 

  logout() {
    const confirm = this.alertCtrl.create({
      title: 'Déconnexion',
      message: 'Êtes-vous sûr de vouloir vous deconnectez?',
      buttons: [
        {
          text: 'Non',
          handler: () => {
            
          }
        },
        {
          text: 'Oui',
          handler: () => {
            this.storage.remove('settings_user');
            this.storage.setItem('settings_user', this.setting_deconnexion);
            this.app.getRootNav().setRoot(ProfesseurLoginPage);
          }
        }
      ]
    });
    confirm.present();
  }

}
