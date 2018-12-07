import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, PopoverController, App } from 'ionic-angular';

import { Profil } from '../../models/profil';
import { PopoverdeconnexionComponent } from '../../components/popoverdeconnexion/popoverdeconnexion';
import { ProfesseurLoginPage } from '../professeur-login/professeur-login';
import { ProfesseurAcceuilPage } from '../professeur-acceuil/professeur-acceuil';

@IonicPage()
@Component({
  selector: 'page-professeur-profile',
  templateUrl: 'professeur-profile.html',
})
export class ProfesseurProfilePage {

  isReadyToSave: boolean;

  item: any;

  form: FormGroup;

  ProfilProfesseur: Profil = 
  							{profilpicture:"", nom: "",prenom:"", contact:"", email:"", adresse:"" };

  constructor(public navCtrl: NavController, 
  			  public navParams: NavParams,
  			  private formBuilder: FormBuilder,
          private popoverCtrl: PopoverController,
          private app: App) {

  	this.form = formBuilder.group({
      profilePic: [''],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      contact: ['', Validators.required],
      email: ['', Validators.required],
      adresse: ['', Validators.required]
    });

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfesseurProfilePage');
  }

  presentPopoverDeconnexion(myEvent)
  {
     let popover = this.popoverCtrl.create(PopoverdeconnexionComponent);
      popover.present({
          ev: myEvent
      });

    popover.onDidDismiss(popoverData => {
        this.app.getRootNav().setRoot(ProfesseurLoginPage);
    });
  }

}
