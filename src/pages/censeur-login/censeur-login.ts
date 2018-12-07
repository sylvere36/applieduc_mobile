import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController,
  			 public navParams: NavParams,
  			 private popoverCtrl: PopoverController) {
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
  	this.navCtrl.setRoot(CenseurAcceuilPage, {}, {
          animate: true,
          direction: 'forward'
        });
  }


}
