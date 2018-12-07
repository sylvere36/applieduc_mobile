import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


import { ProfesseurLoginPage } from '../professeur-login/professeur-login';
import { ParentLoginPage } from '../parent-login/parent-login';
import { CenseurLoginPage } from '../censeur-login/censeur-login';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  profils = 
  [
    {
      value: 0, 
      name:"Censeur"
    }, 
    {
      value: 1, 
      name:"Parent d'élève"
    }, 
    {
      value: 2, 
      name:"Professeur"
    }
  ];

  profiltype: any;

	slides = [
    {
      title: "Bienvenue sur Schoolink!",
      description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
      image: "assets/img/ica-slidebox-img-1.png",
    },
    {
      title: "C'est  quoi Schoolink?",
      description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
      image: "assets/img/ica-slidebox-img-2.png",
    },
    {
      title: "C'est  quoi Schoolink?",
      description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
      image: "assets/img/ica-slidebox-img-3.png",
    }
];

  constructor(public navCtrl: NavController) {

  }


  goToFirstPage()
  {
    if(this.profiltype == 0)
    {
      this.navCtrl.setRoot(CenseurLoginPage, {}, {
        animate: true,
        direction: 'forward'
      });
    }

    if(this.profiltype == 1)
    {
      this.navCtrl.setRoot(ParentLoginPage, {}, {
        animate: true,
        direction: 'forward'
      });
    }

    if(this.profiltype == 2)
    {
      this.navCtrl.setRoot(ProfesseurLoginPage, {}, {
        animate: true,
        direction: 'forward'
      });
    }
  }

}
