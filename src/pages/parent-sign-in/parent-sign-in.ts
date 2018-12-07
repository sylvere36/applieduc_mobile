import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';

import {PopoverprofilComponent} from '../../components/popoverprofil/popoverprofil';

import { ProfesseurLoginPage } from '../professeur-login/professeur-login'; 
import { CenseurLoginPage } from '../censeur-login/censeur-login'; 
import { ParentLoginPage } from '../parent-login/parent-login'; 
import { ParentAcceuilPage } from '../parent-acceuil/parent-acceuil';

@IonicPage()
@Component({
  selector: 'page-parent-sign-in',
  templateUrl: 'parent-sign-in.html',
})
export class ParentSignInPage {

  constructor(public navCtrl: NavController, 
  			  public navParams: NavParams,
  			  private popoverCtrl: PopoverController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfesseurSignInPage');
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

  inscriptionProfesseur()
  {
     this.navCtrl.setRoot(ParentAcceuilPage, {}, {
        animate: true,
        direction: 'forward'
      });
  }

}
