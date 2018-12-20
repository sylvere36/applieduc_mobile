import { Api } from './../../providers/api/api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';



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
  info_detail: any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private api: Api,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController) {

      this.id_notification = navParams.get('id_notification');
      this.valide = navParams.get('valider');

      if(this.valide == 1){
        this.isvalide=true; 
      }else{
        this.isvalide=false;
      }
  }

  ionViewWillEnter(){
	
      this.result = this.api.get('censeur/liste_eleve_note/'+ this.id_notification);
      this.result.subscribe((res) => {
        if (res.status === true) {
          this.eleves_notes = res.data;
          this.info_detail = res.info_detail;
        }else
        {
          let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: res.message,
            buttons: ['Quitter']
          });
          alert.present();
        }
      }, err => {
        let alert = this.alertCtrl.create({
          title: 'Error of get api',
          subTitle: this.id_notification,
          buttons: ['Quitter']
        });
        alert.present();
        console.error('ERROR', err);
      });
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
      let alert = this.alertCtrl.create({
        title: 'Error of get api',
        subTitle: err.message,
        buttons: ['Quitter']
      });
      alert.present();
      console.error('ERROR', err);
    });
  }

}
