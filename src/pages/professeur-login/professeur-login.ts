
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, AlertController, LoadingController, Platform } from 'ionic-angular';

import { PopoverprofilComponent } from '../../components/popoverprofil/popoverprofil';
import { ProfesseurAcceuilPage } from '../professeur-acceuil/professeur-acceuil';

import { CenseurLoginPage } from '../censeur-login/censeur-login';
import { ParentLoginPage } from '../parent-login/parent-login';


import { Api } from '../../providers/api/api';
import {Settings} from '../../models/settings';

import { Subscription} from 'rxjs/Subscription';

//Native
import { Network } from '@ionic-native/network';
import { NativeStorage } from '@ionic-native/native-storage';


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
  setting: Settings = {type_user: "",identifiant: "", logged:false };
  connected: Subscription;
  disconnected: Subscription;
  errormessage: any;


  constructor(public navCtrl: NavController,
         public navParams: NavParams,
         private network: Network,
         private storage: NativeStorage,
         private popoverCtrl: PopoverController,
         private loadingCtrl: LoadingController,
         private alertCtrl: AlertController,
         private api: Api,
         private plateform: Platform
         ) {

      
  }

  ionViewDidEnter(){
    this.connected = this.network.onConnect().subscribe(() => {
      this.connect = true;
    }, error => console.log(error));

    this.disconnected = this.network.onDisconnect().subscribe(() => {
      this.connect = false;
    }, error => console.log(error));
  }

  ionViewWillLeave(){
    this.connected.unsubscribe();
    this.disconnected.unsubscribe();
  }
  

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverprofilComponent);
    popover.present({
      ev: myEvent
    });

    popover.onDidDismiss(popoverData => {
      
      try {
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
      } catch (e) {
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
      content: "Veuillez patienter svp !!!"
    });

    loading.present();

      this.api.post('professeur/login', this.ref).then((results) => {
        loading.dismiss();
        
        this.result = results;
  
          if(this.result.status == true)
          {
            //Stockage des infos en locale( Utilisation de native storage )
            this.setting.logged = true;
            this.setting.type_user = "professeur";
            this.setting.identifiant = this.ref.reference;

            this.storage.setItem('settings_user', this.setting)
            .then(
              () =>{
                this.navCtrl.setRoot(ProfesseurAcceuilPage, {}, {
                  animate: true,
                  direction: 'forward'
                });
  
              },
              error =>{
                let alert = this.alertCtrl.create({
                  title: 'Error de stockage' ,
                  subTitle: error.message,
                  buttons: ['Quitter']
                });
                alert.present();
              } 
            );
  
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
                    this.loginProfesseurPage();
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
