import { LocalNotifications } from '@ionic-native/local-notifications';
import { CenseurViewNotePage } from './../censeur-view-note/censeur-view-note';
import { Api } from './../../providers/api/api';
import { NativeStorage } from '@ionic-native/native-storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-censeur-notification',
  templateUrl: 'censeur-notification.html',
})
export class CenseurNotificationPage {

  result: any;
	notifications: any;
	notifications_valide: any;
	notifications_non_valide: any;
	valider: any;
	MenuSeg: string = "allNotif";
	size_non_valide: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private storage: NativeStorage,
		private api: Api,
		private localNotif: LocalNotifications) {
  }

  ionViewWillEnter(){
		let loading = this.loadingCtrl.create({
      		content: "Veuillez patienter svp !!!"
		});
		loading.present();
		this.storage.getItem('settings_user')
		.then(
			data => 
			{
				this.result = this.api.get('censeur/getNotifications/'+ data.identifiant);
				this.result.subscribe((res) => {
					loading.dismiss();
					if (res.status === true) {
						this.notifications = res.data;
						this.notifications_valide = res.data_valid;
						this.notifications_non_valide = res.data_non_valid;
						this.size_non_valide = res.size_non_valide;

						
						if(this.size_non_valide != 0)
						{
							//this.localNotif.schedule({});
							//var date = new Date(this.data.date+" "+this.data.time);
							//console.log(date);
							this.localNotif.schedule({
								text: 'Vous avez '+ this.size_non_valide + ' notifications en attente de validation.',
								led: 'FF0000',
							});
						}
					}
				}, err => {
					loading.dismiss();
					let alert = this.alertCtrl.create({
						title: 'Error of get api',
						subTitle: err.message,
						buttons: ['Quitter']
					});
					alert.present();
					console.error('ERROR', err);
				});
			},
			error => 
			{
				loading.dismiss();
				let alert = this.alertCtrl.create({
								title: 'Error of get storage',
								subTitle: error.message,
								buttons: ['Quitter']
							});
							alert.present();
				console.error(error);
			}
		);
  }
  
  vu(id_notification, valider)
  {
    let loading = this.loadingCtrl.create({
      content: "Veuillez patienter svp !!!"
    });
    loading.present();

    this.result = this.api.get('censeur/vu/'+ id_notification);
				this.result.subscribe((res) => {
					loading.dismiss();
            this.navCtrl.push(CenseurViewNotePage,
              {
								'id_notification': id_notification, 
								'valider': valider
              });
				}, err => {
					let alert = this.alertCtrl.create({
						title: 'Error of get api',
						subTitle: err.message,
						buttons: ['Quitter']
					});
					alert.present();
					console.error('ERROR', err);
				});
  }

}
