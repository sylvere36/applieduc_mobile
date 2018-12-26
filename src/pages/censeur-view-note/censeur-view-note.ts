import { Api } from './../../providers/api/api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController, Platform } from 'ionic-angular';
import { Network } from '@ionic-native/network';

@IonicPage()
@Component({
  selector: 'page-censeur-view-note',
  templateUrl: 'censeur-view-note.html',
})
export class CenseurViewNotePage {

  result: any;
  eleves_notes: any;
  id_notification: any;
  valide: any;
  isvalide:boolean=false;
  info_detail= {type_note:"", nom_periode:""};
  errormessage: any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private api: Api,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private plateform: Platform,
    private network: Network) {

      this.id_notification = navParams.get('id_notification');
      this.valide = navParams.get('valider');

      if(this.valide == 1){
        this.isvalide=true; 
      }else{
        this.isvalide=false;
      }
  }

  ionViewWillEnter(){
    this.getelevenote();
  }

  valider()
  {
    let loading = this.loadingCtrl.create({
      content: "Veuillez patienter svp !!!"
    });
    loading.present();

    this.result = this.api.get('censeur/valider/'+ this.id_notification);
    this.result.subscribe((res) => {
      loading.dismiss();
      if (res.status === true) {
        this.navCtrl.pop();
        let toast = this.toastCtrl.create({
          message: res.message,
          duration: 2000,
          cssClass: "toastsucesscss"
        });
    
        toast.present();
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
            this.valider();
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

  getelevenote()
  {
    this.result = this.api.get('censeur/liste_eleve_note/'+ this.id_notification);
      this.result.subscribe((res) => {
        if (res.status === true) {
          this.eleves_notes = res.data;
          this.info_detail.type_note = res.info_detail.type_note;
          this.info_detail.nom_periode = res.info_detail.nom_periode;
        }else
        {
          let alert = this.alertCtrl.create({
            title: 'Erreur',
            subTitle: res.message,
            buttons: ['Quitter']
          });
          alert.present();
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
              this.getelevenote();
          }
          }
          ]
        });
        alert.present();
      });
  }

}
