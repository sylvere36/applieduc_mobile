import { Network } from '@ionic-native/network';
import { Api } from './../../providers/api/api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, LoadingController, AlertController, Platform } from 'ionic-angular';

import { ParentAcceuilPage } from '../parent-acceuil/parent-acceuil';
import { ParentSignInPage } from '../parent-sign-in/parent-sign-in';

import { PopoverprofilComponent } from '../../components/popoverprofil/popoverprofil';

import { CenseurLoginPage } from '../censeur-login/censeur-login';
import { ProfesseurLoginPage } from '../professeur-login/professeur-login';
import { Settings } from '../../models/settings';
import { NativeStorage } from '@ionic-native/native-storage';


@IonicPage()
@Component({
  selector: 'page-parent-login',
  templateUrl: 'parent-login.html',
})
export class ParentLoginPage {

  ref = {email: '', password: ''};

  setting: Settings = {type_user: "", identifiant: "", logged: false};
  result: any;
  errormessage:any;
  
  constructor(public navCtrl: NavController, 
  			public navParams: NavParams, 
  			private popoverCtrl: PopoverController,
         private loadingCtrl: LoadingController,
         private alertCtrl: AlertController,
         private storage: NativeStorage, 
         private api: Api,
         private network: Network,
         private plateform: Platform) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ParentLoginPage');
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


  loginParentPage()
  {

    let loading = this.loadingCtrl.create({
      content: "Veuillez patienter svp !!!"
    });
    loading.present();
    
      this.api.post('parents/login', this.ref).then((results) => {
        loading.dismiss();
        
        this.result = results;
  
          if(this.result.status == true)
          {
            //Stockage des infos en locale( Utilisation de native storage )
            this.setting.logged = true;
            this.setting.type_user = "parent";
            this.setting.identifiant = this.result.data[0].id;

            this.storage.setItem('settings_user', this.setting)
            .then(
              () =>{
                this.navCtrl.setRoot(ParentAcceuilPage, {}, {
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
                this.loginParentPage();
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

  goToSignInParentPage()
  {
  	this.navCtrl.setRoot(ParentSignInPage, {}, {
        animate: true,
        direction: 'forward'
      });
  }

}
