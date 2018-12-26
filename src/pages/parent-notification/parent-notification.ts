import { LocalNotifications } from '@ionic-native/local-notifications';
import { NativeStorage } from '@ionic-native/native-storage';
import { Api } from './../../providers/api/api';
import { Network } from '@ionic-native/network';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, Platform, ModalController } from 'ionic-angular';
import { ModalViewNotifParentComponent } from '../../components/modal-view-notif-parent/modal-view-notif-parent';



@IonicPage()
@Component({
  selector: 'page-parent-notification',
  templateUrl: 'parent-notification.html',
})
export class ParentNotificationPage {

  result:any;
  errormessage: any;
  notifications: any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private network: Network,
    private loadingCtrl: LoadingController,
    private api: Api,
    private storage: NativeStorage,
    private localNotif: LocalNotifications,
    private alertCtrl: AlertController,
    private plateform: Platform,
    private modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ParentNotificationPage');
  }

  ionViewWillEnter(){
   this.getallNotificationparent();
  }

  getallNotificationparent()
	{
		let loading = this.loadingCtrl.create({
			content: "Veuillez patienter svp !!!"
		});
		loading.present();
		this.storage.getItem('settings_user')
		.then(
			data => 
			{
				this.result = this.api.get('parents/getNotifications/'+ data.identifiant);
				this.result.subscribe((res) => {
					loading.dismiss();
					if (res.status === true) {
            this.notifications = res.data;
          
            this.notifications.forEach(element => {
              if(element.VU == 0 && !this.localNotif.isPresent(element.ID_NOTIFICATION)) 
              {
                this.localNotif.schedule({
                  id: element.ID_NOTIFICATION,
                  text: element.MESSAGE,
                  led: 'FF0000',
                })
              }
            });
						
					}
				}, err => {

					if (this.network.type == 'none' ) { 
            this.errormessage = "Veillez verifier votre connexion internet";
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
                  this.getallNotificationparent();
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
  
  vu(id_notification)
  {
    let loading = this.loadingCtrl.create({
      content: "Veuillez patienter svp !!!"
    });
    loading.present();

    this.result = this.api.get('parents/vu/'+ id_notification);
				this.result.subscribe((res) => {
          loading.dismiss();
          
          this.modalCtrl.create(ModalViewNotifParentComponent,
            {
              infonoti: res.message
            } , { cssClass: 'inset-modal' }).present();
            
				}, err => {
					if (this.network.type == 'none' ) { 
            this.errormessage = "Veillez verifier votre connexion internet";
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
                  this.vu(id_notification);
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


}
