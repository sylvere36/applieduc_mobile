import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';


@Component({
  selector: 'popoverdeconnexion',
  templateUrl: 'popoverdeconnexion.html'
})
export class PopoverdeconnexionComponent {

  constructor(private viewCtrl: ViewController) {
   
  }

  itemclick()
  {
  	this.viewCtrl.dismiss();
  }

}
