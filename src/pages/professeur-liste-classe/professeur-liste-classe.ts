import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';

import {ProfesseurListeEleveClassePage} from 
'../professeur-liste-eleve-classe/professeur-liste-eleve-classe';


/**
 * Generated class for the ProfesseurListeClassePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-professeur-liste-classe',
  templateUrl: 'professeur-liste-classe.html',
})
export class ProfesseurListeClassePage {

  constructor(public navCtrl: NavController,
  			 public navParams: NavParams,
  			 private actionSheet: ActionSheetController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfesseurListeClassePage');
  }

  accederClasse()
  {
  	const actionsheet = this.actionSheet.create({
  		title: 'Choisir le trimestre',
	    buttons: [
	        {
	          text: 'Trimestre 1',
	          role: 'destructive',
	          handler: () => {
	            this.navCtrl.push(ProfesseurListeEleveClassePage,
	            	{
	            		trimestre: 1
	            	});
	          }
	        },
	        {
	          text: 'Trimestre 2',
	          handler: () => {
	            this.navCtrl.push(ProfesseurListeEleveClassePage,
	            	{
	            		trimestre: 2
	            	});
	          }
	        },
	        {
	          text: 'Trimestre 3',
	          handler: () => {
	            this.navCtrl.push(ProfesseurListeEleveClassePage,
	            	{
	            		trimestre: 3
	            	});
	          }
	        },

	      ]

  	});

  	actionsheet.present();
  }

}
