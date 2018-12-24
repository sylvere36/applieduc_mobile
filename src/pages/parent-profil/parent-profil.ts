import { Api } from './../../providers/api/api';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, PopoverController, App, AlertController, LoadingController } from 'ionic-angular';

import { Profil } from '../../models/profil';

import { PopoverdeconnexionComponent } from '../../components/popoverdeconnexion/popoverdeconnexion';
import { ParentLoginPage } from '../parent-login/parent-login';
import { Settings } from '../../models/settings';
import { NativeStorage } from '@ionic-native/native-storage';

@IonicPage()
@Component({
  selector: 'page-parent-profil',
  templateUrl: 'parent-profil.html',
})
export class ParentProfilPage {

  result: any;
  nomprofil: string;
  prenomprofil: string;
  setting_deconnexion: Settings = {logged: false, identifiant: "", type_user: "parent"};
  ProfilParent: Profil = 
                {profilpicture:"", nom: "",prenom:"", contact:"", email:"", adresse:"" };

  updatepass =  {passactuel: "", newpass: "", confirmpass: "", email: ""};

  constructor(public navCtrl: NavController, 
  			  public navParams: NavParams,
          private popoverCtrl: PopoverController,
          private app: App,
          private alertCtrl: AlertController,
          private loadingCtrl: LoadingController,
          private storage: NativeStorage,
          private api: Api) {

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
				this.result = this.api.get('parents/profil/'+ data.identifiant);
				this.result.subscribe((res) => {
					loading.dismiss();
					if (res.status == true) {
            this.nomprofil = res.data[0].nom;
            this.prenomprofil = res.data[0].prenom;
            this.ProfilParent.profilpicture = this.nomprofil.charAt(0)+this.prenomprofil.charAt(0);
            this.ProfilParent.nom = res.data[0].nom;
            this.ProfilParent.prenom = res.data[0].prenom;
            this.ProfilParent.contact = res.data[0].telephone;
            this.ProfilParent.email = res.data[0].email_mobile;
            this.ProfilParent.adresse = res.data[0].adresse;
					}
				}, err => {
					let alert = this.alertCtrl.create({
						title: 'Probleme de connexion',
						subTitle: "Verifier votre connexion internet",
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
  


  presentPopoverDeconnexion(myEvent)
  {
     let popover = this.popoverCtrl.create(PopoverdeconnexionComponent);
      popover.present({
          ev: myEvent
      });

    popover.onDidDismiss(popoverData => {
        this.app.getRootNav().setRoot(ParentLoginPage);
    }
    );
  }

  changePassword(){}

  logoutparent(){}

}
