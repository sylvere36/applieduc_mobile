import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ParentNotificationPage } from '../parent-notification/parent-notification';
import { ParentEnfantPage } from '../parent-enfant/parent-enfant';
import { ParentProfilPage } from '../parent-profil/parent-profil';
import { AboutPage } from '../about/about';

@IonicPage()
@Component({
  selector: 'page-parent-acceuil',
  templateUrl: 'parent-acceuil.html',
})
export class ParentAcceuilPage {

  tab1Root: any = ParentNotificationPage;
  tab2Root: any = ParentEnfantPage;
  tab3Root: any = ParentProfilPage;
  tab4Root: any = AboutPage;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ParentAcceuilPage');
  }

}
