import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { CenseurNotificationPage } from '../censeur-notification/censeur-notification';
import { CenseurProfilPage } from '../censeur-profil/censeur-profil';
import { AboutPage } from '../about/about';

@IonicPage()
@Component({
  selector: 'page-censeur-acceuil',
  templateUrl: 'censeur-acceuil.html'
})
export class CenseurAcceuilPage {

  censeurNotificationRoot: any = CenseurNotificationPage
  censeurProfilRoot: any = CenseurProfilPage
  apropos: any = AboutPage


  constructor(public navCtrl: NavController) {}

}
