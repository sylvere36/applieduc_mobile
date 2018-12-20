import { Api } from './../../providers/api/api';
import { Settings } from './../../models/settings';
import { NativeStorage } from '@ionic-native/native-storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, LoadingController, AlertController } from 'ionic-angular';

import { PopoverprofilComponent } from '../../components/popoverprofil/popoverprofil';
import { CenseurAcceuilPage } from '../censeur-acceuil/censeur-acceuil';

import { ProfesseurLoginPage } from '../professeur-login/professeur-login';
import { ParentLoginPage } from '../parent-login/parent-login';

@IonicPage()
@Component({
  selector: 'page-censeur-login',
  templateUrl: 'censeur-login.html',
})
export class CenseurLoginPage {

  ref = {email: '', password: ''};

  setting: Settings = {type_user: "", identifiant: "", logged: false};
  result: any;

  constructor(public navCtrl: NavController,
  			 public navParams: NavParams,
         private popoverCtrl: PopoverController,
         private loadingCtrl: LoadingController,
         private alertCtrl: AlertController,
         private storage: NativeStorage, 
         private api: Api) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CenseurLoginPage');
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

  loginCenseurPage()
  {
        let loading = this.loadingCtrl.create({
          content: "Veuillez patienter svp !!!"
        });
    
        loading.present();
    
          this.api.post('censeur/login', this.ref).then((results) => {
            loading.dismiss();
            
            this.result = results;
      
              if(this.result.status == true)
              {
                //Stockage des infos en locale( Utilisation de native storage )
                this.setting.logged = true;
                this.setting.type_user = "censeur";
                this.setting.identifiant = this.result.data[0].id;
    
                this.storage.setItem('settings_user', this.setting)
                .then(
                  () =>{
                    this.navCtrl.setRoot(CenseurAcceuilPage, {}, {
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
                  title: 'Connection Impossible',
                  subTitle: this.result.message,
                  buttons: ['Quitter']
                });
                alert.present();
              }
      
            }, (err) => {
              loading.dismiss();
              let alert = this.alertCtrl.create({
                title: 'Erreur api',
                subTitle: err.message,
                buttons: ['Quitter']
              });
              alert.present();
              console.log('ERROR', err);
          });
  }


}
