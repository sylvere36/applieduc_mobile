import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-parent-enfant',
  templateUrl: 'parent-enfant.html',
})
export class ParentEnfantPage {

  constructor(
  			public navCtrl: NavController, 
  			public navParams: NavParams,
  			private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ParentEnfantPage');
  }

  addEnfant()
  {
  	const prompt = this.alertCtrl.create({
      title: 'Code Enfant',
      message: "Veuillez entrer le code de l'enfant",
      inputs: [
        {
          name: 'title',
          placeholder: ''
        },
      ],
      buttons: [
        {
          text: 'Annuler',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ajouter',
          handler: data => {
            console.log(data);
          }
        }
      ]
    });
    prompt.present();
  }

}
