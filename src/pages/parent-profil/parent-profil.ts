import { Network } from '@ionic-native/network';
import { Api } from './../../providers/api/api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, App, AlertController, LoadingController, Platform } from 'ionic-angular';

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

  errormessage: any;
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
          private api: Api,
          private network: Network,
          private plateform: Platform) {

  }

  ionViewWillEnter(){
		this.getparentprofil();
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


  logoutparent()
  {
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
            this.app.getRootNav().setRoot(ParentLoginPage);
          }
        }
      ]
    });
    confirm.present();
  }

  getparentprofil()
  {
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
                this.getparentprofil();
              }
              }
            ]
          });
            
          setTimeout(function(){
          loading.dismiss();
          alert.present();
          }, 10000);
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

  changePassword()
  {
    this.updatepass.email = this.ProfilParent.email;
    let loading = this.loadingCtrl.create({
      content: "Veuillez patienter svp !!!"
    });

    loading.present();

    this.api.post('parents/updatepass', this.updatepass).then((results) => {
        loading.dismiss();
        
        this.result = results;
  
          if(this.result.status === true)
          {
            let alert = this.alertCtrl.create({
              title: 'Succès',
              subTitle: this.result.message,
              buttons: ['Quitter']
            });
            alert.present();

            this.updatepass =  {passactuel: "", newpass: "", confirmpass: "", email: ""};
          
          }else
          {
            let alert = this.alertCtrl.create({
              title: 'Erreur',
              subTitle: this.result.message,
              buttons: ['Quitter']
            });
            alert.present();
          }
  
        }, (err) => {
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
                  this.changePassword();
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
