import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';

import { PopoverprofilComponent } from '../../components/popoverprofil/popoverprofil';
import { ProfesseurAcceuilPage } from '../professeur-acceuil/professeur-acceuil';

import { CenseurLoginPage } from '../censeur-login/censeur-login';
import { ParentLoginPage } from '../parent-login/parent-login';

@IonicPage()
@Component({
  selector: 'page-professeur-login',
  templateUrl: 'professeur-login.html',
})
export class ProfesseurLoginPage {

  constructor(public navCtrl: NavController,
  			 public navParams: NavParams,
  			 private popoverCtrl: PopoverController) {
  }

  ionViewDidLoad() {
 
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


  loginProfesseurPage()
  {
  	
  	this.navCtrl.setRoot(ProfesseurAcceuilPage, {}, {
        animate: true,
        direction: 'forward'
      });
  }

}
