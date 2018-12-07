import { Component } from '@angular/core';

import { ViewController } from 'ionic-angular';


@Component({
  selector: 'popoverprofil',
  templateUrl: 'popoverprofil.html'
})
export class PopoverprofilComponent {

  items: any;

  constructor(private viewCtrl: ViewController) {
    this.items = 
    [
    	{title: "Censeur", Page: "0"},
    	{title: "Parent d'élève", Page: "1"},
    	{title: "Professeur", Page: "2"}
    ]
  }


  itemclick(item)
  {
  	this.viewCtrl.dismiss(item);
  }

}
