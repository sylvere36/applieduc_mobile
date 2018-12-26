import { Network } from '@ionic-native/network';
import { Api } from './../../providers/api/api';
import { NativeStorage } from '@ionic-native/native-storage';
import { Settings } from './../../models/settings';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, AlertController, LoadingController, Platform } from 'ionic-angular';

import { Profil } from '../../models/profil';
import { CenseurLoginPage } from '../censeur-login/censeur-login';

@IonicPage()
@Component({
  selector: 'page-censeur-profil',
  templateUrl: 'censeur-profil.html',
})
export class CenseurProfilPage {

 
  result: any;
  nomprofil: string;
  prenomprofil: string;
  setting_deconnexion: Settings = {logged: false, identifiant: "", type_user: "censeur"};
  ProfilCenseur: Profil = 
                {profilpicture:"", nom: "",prenom:"", contact:"", email:"", adresse:"" };

  updatepass =  {passactuel: "", newpass: "", confirmpass: "", email: ""};
  errormessage: any;

  constructor(public navCtrl: NavController, 
  			  public navParams: NavParams,
              private app: App,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController,
              private storage: NativeStorage,
              private api: Api,
              private network: Network,
              private plateform: Platform) {

  	
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CenseurLoginPage');
  }

  ionViewWillEnter(){
		this.getcenseurprofil();
  }
  
  changePassword()
  {
    this.updatepass.email = this.ProfilCenseur.email;
    let loading = this.loadingCtrl.create({
      content: "Veuillez patienter svp !!!"
    });

    loading.present();

    this.api.post('censeur/updatepass', this.updatepass).then((results) => {
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
            this.errormessage = "Veillez verifier votre connexion internet";
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


  logoutcenseur()
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
            this.app.getRootNav().setRoot(CenseurLoginPage);
          }
        }
      ]
    });
    confirm.present();
  }


  getcenseurprofil()
  {
    let loading = this.loadingCtrl.create({
      content: "Veuillez patienter svp !!!"
    });
    loading.present();
    this.storage.getItem('settings_user')
    .then(
    data => 
    {
    this.result = this.api.get('censeur/profil/'+ data.identifiant);
    this.result.subscribe((res) => {
      loading.dismiss();
      if (res.status == true) {
        this.nomprofil = res.data[0].nom;
        this.prenomprofil = res.data[0].prenom;
        this.ProfilCenseur.profilpicture = this.nomprofil.charAt(0)+this.prenomprofil.charAt(0);
        this.ProfilCenseur.nom = res.data[0].nom;
        this.ProfilCenseur.prenom = res.data[0].prenom;
        this.ProfilCenseur.contact = res.data[0].telephone;
        this.ProfilCenseur.email = res.data[0].email_mobile;
        this.ProfilCenseur.adresse = res.data[0].adresse;
      }
    }, err => {
      if (this.network.type == 'none' ) { 
        this.errormessage = "Veillez verifier votre connexion internet";
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
              this.getcenseurprofil();
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

}
