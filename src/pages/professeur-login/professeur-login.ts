import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, 
  PopoverController,ToastController, AlertController, LoadingController } from 'ionic-angular';

import { PopoverprofilComponent } from '../../components/popoverprofil/popoverprofil';
import { ProfesseurAcceuilPage } from '../professeur-acceuil/professeur-acceuil';

import { CenseurLoginPage } from '../censeur-login/censeur-login';
import { ParentLoginPage } from '../parent-login/parent-login';

import { ProfesseurProvider } from './../../providers/professeur/professeur';

import { Api } from '../../providers/api/api';
import { Network } from '@ionic-native/network';

@IonicPage()
@Component({
  selector: 'page-professeur-login',
  templateUrl: 'professeur-login.html',
})
export class ProfesseurLoginPage {

  ref = {reference: ''};
  result: any;
  connect: boolean;
  loading: any;


  constructor(public navCtrl: NavController,
         public navParams: NavParams,
         private network: Network,
         private popoverCtrl: PopoverController,
         private profprovider: ProfesseurProvider,
         private toastCtrl: ToastController,
         private loadingCtrl: LoadingController,
         private alertCtrl: AlertController,
         private api: Api) {

      this.network.onConnect().subscribe(() => {
        this.connect = true;
      }, error => console.log(error));
  
      this.network.onDisconnect().subscribe(() => {
        this.connect = false;
      }, error => console.log(error));
  }

  ionViewWillEnter(){
    
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverprofilComponent);
    popover.present({
      ev: myEvent
    });

    popover.onDidDismiss(popoverData => {
      console.log(popoverData);

      if(popoverData.Page == 0)
      {
        this.navCtrl.setRoot(CenseurLoginPage, {}, {
          animate: true,
          direction: 'forward'
        });
      }

       if(popoverData.Page == 1)
      {
         this.navCtrl.setRoot(ParentLoginPage, {}, {
          animate: true,
          direction: 'forward'
        });
      }

       if(popoverData.Page == 2)
      {
         this.navCtrl.setRoot(ProfesseurLoginPage, {}, {
          animate: true,
          direction: 'forward'
        });
      }
    });
  }

  /**
   * FOnction de connection du professeur
   * @param: codeprof
   * **** Requete vers une api 
   * On verifie d'abord si l'utilisateur est connecté si une on fait la requete
   * si non on lui renvoie une alert specifiant qu'il n'y a aucune connection 
   * internet
   */


  loginProfesseurPage()
  {
    
    let loading = this.loadingCtrl.create({
      content: "Veuillez patienter svp !!!",
      duration: 3000
    });

    loading.present();

    if(this.connect === true)
    {
      this.api.post('professeur/login', this.ref).then((result) => {
        loading.dismiss();
        
        this.result = result;
  
          if(this.result.status)
          {
            this.navCtrl.setRoot(ProfesseurAcceuilPage, {
              data: this.result.data
            }, {
              animate: true,
              direction: 'forward'
            });
  
  
          }else
          {
            let alert = this.alertCtrl.create({
              title: 'Erreur de connection',
              subTitle: this.result.message,
              buttons: ['Quitter']
            });
            alert.present();
          }
  
        }, (err) => {
          console.log('ERROR', err);
      });
    }else
    {
      loading.dismiss();
      let alert = this.alertCtrl.create({
          title: 'Probleme de connection',
          subTitle: "Aucune connexion internet",
          buttons: ['Quitter']
        });
        alert.present();
    }
    
  }

}
