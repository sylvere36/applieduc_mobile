import { NavParams, ViewController } from 'ionic-angular';
import { Component } from '@angular/core';


@Component({
  selector: 'modal-view-notif-parent',
  templateUrl: 'modal-view-notif-parent.html'
})
export class ModalViewNotifParentComponent {

  infoNoti: string;

  constructor(private params: NavParams,
              private viewCtrl: ViewController) {
    this.infoNoti = this.params.get("infonoti");
  }

  dismiss()
	{
		this.viewCtrl.dismiss();
	}

}
