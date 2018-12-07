import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';

import { ParentAcceuilPage } from '../parent-acceuil/parent-acceuil';
import { ParentSignInPage } from '../parent-sign-in/parent-sign-in';

import { PopoverprofilComponent } from '../../components/popoverprofil/popoverprofil';

import { CenseurLoginPage } from '../censeur-login/censeur-login';
import { ProfesseurLoginPage } from '../professeur-login/professeur-login';


@IonicPage()
@Component({
  selector: 'page-parent-login',
  templateUrl: 'parent-login.html',
})
export class ParentLoginPage {

  constructor(public navCtrl: NavController, 
  			public navParams: NavParams, 
  			private popoverCtrl: PopoverController) {
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
  	this.navCtrl.setRoot(ParentAcceuilPage, {}, {
        animate: true,
        direction: 'forward'
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
