import { Network } from '@ionic-native/network';
import { Api } from './../../providers/api/api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController, Platform } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';



@IonicPage()
@Component({
  selector: 'page-parent-enfant',
  templateUrl: 'parent-enfant.html',
})
export class ParentEnfantPage {

  result: any;
  datasend:any;
  enfants: any;
  errormessage: any;
  constructor(
  			public navCtrl: NavController, 
  			public navParams: NavParams,
        private alertCtrl: AlertController,
        private loadingCtrl: LoadingController,
        private storage: NativeStorage,
        private toastCtrl: ToastController,
        private api: Api,
        private plateform: Platform,
        private network: Network) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ParentEnfantPage');
  }

  ionViewWillEnter(){
   this.getallenfant();
  }

  addEnfant()
  {
  	const prompt = this.alertCtrl.create({
      title: 'Code Enfant',
      message: "Veuillez entrer le code de l'enfant",
      inputs: [
        {
          name: 'codeenfant',
          placeholder: ''
        },
      ],
      buttons: [
        {
          text: 'Annuler',
          handler: data => {
            
          }
        },
        {
          text: 'Ajouter',
          handler: data => {
            this.addchildfunc(data.codeenfant);
          }
        }
      ]
    });
    prompt.present();
  }


  addchildfunc(codeenfant)
  {
    let loading = this.loadingCtrl.create({
      content: "Veuillez patienter svp !!!"
    });
    loading.present();
    this.storage.getItem('settings_user')
		.then(
			data => 
			{
        this.datasend = {
          'id_parent': data.identifiant,
          'codeenfant': codeenfant
        };
				this.api.post('parents/child_parent', this.datasend).then((results) => {
          loading.dismiss();
          
          this.result = results;
    
            if(this.result.status == true)
            {
              const toast = this.toastCtrl.create({
                message: 'Enfant Ajouté avec succcès',
                duration: 3000,
                position: 'top',
                cssClass: "toastSuccess"
                });
    
              toast.present();
            }else
            {
              let alert = this.alertCtrl.create({
                title: 'Problème d\'ajout',
                subTitle: this.result.message,
                buttons: ['Quitter']
              });
              alert.present();
            }
    
          }, (err) => {
            
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
                    this.addchildfunc(data);
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
			}
		);
  }


  getallenfant()
  {
    let loading = this.loadingCtrl.create({
      content: "Veuillez patienter svp !!!"
    });
    loading.present();
    this.storage.getItem('settings_user')
    .then(
      data => 
      {
        this.result = this.api.get('parents/getchilds/'+ data.identifiant);
        this.result.subscribe((res) => {
          loading.dismiss();
          if (res.status == true) {
            this.enfants = res.data;
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
                  this.addchildfunc(data);
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
