import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ProfesseurAcceuilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 import { ProfesseurListeClassePage } from '../professeur-liste-classe/professeur-liste-classe';
 import { ProfesseurProfilePage } from '../professeur-profile/professeur-profile';
 import { AboutPage } from '../about/about';

@IonicPage()
@Component({
  selector: 'page-professeur-acceuil',
  templateUrl: 'professeur-acceuil.html',
})
export class ProfesseurAcceuilPage {

  tab1Root: any = ProfesseurListeClassePage;
  tab2Root: any = ProfesseurProfilePage;
  tab3Root: any = AboutPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfesseurAcceuilPage');
  }

}
