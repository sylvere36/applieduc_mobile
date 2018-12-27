import { Network } from '@ionic-native/network';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { CenseurViewNotePage } from './../censeur-view-note/censeur-view-note';
import { Api } from './../../providers/api/api';
import { NativeStorage } from '@ionic-native/native-storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, Platform } from 'ionic-angular';



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
	errormessage: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private storage: NativeStorage,
		private api: Api,
		private localNotif: LocalNotifications,
		private network: Network,
		private plateform: Platform) {
  }

  ionViewWillEnter(){
		this.getallNotificationcenseur();
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
					if (this.network.type == 'none' ) { 
            this.errormessage = "Veuillez verifier votre connexion internet";
          } else {
            this.errormessage = err.message;
          }
          
          let alert = this.alertCtrl.create({
            title: 'Problème de connection',
            subTitle: this.errormessage,
            buttons: [
              {
                text: 'Quitter',
                handler: () => {
                  this.plateform.exitApp();
                }
              },
              {
                text: 'Réessayer',
                handler: () => {
                  this.vu(id_notification, valider);
                }
              }
              ]
            });
            
            setTimeout(function(){
              loading.dismiss();
              alert.present();
            }, 10000);
				});
	}
	

	getallNotificationcenseur()
	{
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

						
						if(this.size_non_valide != 0 && !this.localNotif.isScheduled(1))
						{
							this.localNotif.schedule({
                id: 1,
								text: 'Vous avez '+ this.size_non_valide + ' notifications en attente de validation.',
                led: 'FF0000',
                trigger: {at: new Date(new Date().getTime() + 3600)}
							});
						}
					}
				}, err => {
					if (this.network.type == 'none' ) { 
            this.errormessage = "Veuillez verifier votre connexion internet";
          } else {
            this.errormessage = err.message;
          }
          
          let alert = this.alertCtrl.create({
            title: 'Problème de connection',
            subTitle: this.errormessage,
            buttons: [
              {
                text: 'Quitter',
                handler: () => {
                  this.plateform.exitApp();
                }
              },
              {
                text: 'Réessayer',
                handler: () => {
                  this.getallNotificationcenseur();
                }
              }
              ]
            });
            
            setTimeout(function(){
              loading.dismiss();
              alert.present();
            }, 10000);
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

}
