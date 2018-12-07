import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
/**
 * Generated class for the ModalDetailNoteEleveComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'modal-detail-note-eleve',
  templateUrl: 'modal-detail-note-eleve.html'
})
export class ModalDetailNoteEleveComponent {

  	nom: string;

  	constructor(private params: NavParams,
  				public viewCtrl: ViewController) {
	    this.nom = this.params.get("nom");
	}

	dismiss()
	{
		this.viewCtrl.dismiss();
	}

}
