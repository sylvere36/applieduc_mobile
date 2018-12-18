import { NativeStorage } from '@ionic-native/native-storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController,
	 LoadingController, AlertController } from 'ionic-angular';

import {ProfesseurListeEleveClassePage} from 
'../professeur-liste-eleve-classe/professeur-liste-eleve-classe';

import { Api } from '../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-professeur-liste-classe',
  templateUrl: 'professeur-liste-classe.html',
})
export class ProfesseurListeClassePage {

	classes: any = [];
	result: any;
	
  constructor(public navCtrl: NavController,
  			 public navParams: NavParams,
				 private actionSheet: ActionSheetController,
				 private api:Api,
				 private storage: NativeStorage,
				 private loadingCtrl: LoadingController,
				 private alertCtrl: AlertController) {
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
				this.result = this.api.get('professeur/classe/'+ data.identifiant);
				this.result.subscribe((res) => {
					loading.dismiss();
					if (res.status == true) {
						this.classes = res.data;
					}
				}, err => {
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

  accederClasse(type, index)
  {
		if(type.toLowerCase() === "semestre")
		{
			const actionsheet = this.actionSheet.create({
				title: 'Choisir le semestre',
				buttons: [
						{
							text: 'Semestre 1',
							role: 'destructive',
							handler: () => {
								this.navCtrl.push(ProfesseurListeEleveClassePage,
									{
										type: "Semestre 1",
										donneeId: this.classes[index]
										
									});
							}
						},
						{
							text: 'Semestre 2',
							handler: () => {
								this.navCtrl.push(ProfesseurListeEleveClassePage,
									{
										type: "Semestre 2",
										donneeId: this.classes[index]
									});
							}
						}
					]
	
			});

			actionsheet.present();
		}

		if(type.toLowerCase() === "trimestre")
		{
			const actionsheet = this.actionSheet.create({
				title: 'Choisir le trimestre',
				buttons: [
						{
							text: 'Trimestre 1',
							role: 'destructive',
							handler: () => {
								this.navCtrl.push(ProfesseurListeEleveClassePage,
									{
										type: "Trimestre 1",
										donneeId: this.classes[index]
									});
							}
						},
						{
							text: 'Trimestre 2',
							handler: () => {
								this.navCtrl.push(ProfesseurListeEleveClassePage,
									{
										type: "Trimestre 2",
										donneeId: this.classes[index]
									});
							}
						},
						{
							text: 'Trimestre 3',
							handler: () => {
								this.navCtrl.push(ProfesseurListeEleveClassePage,
									{
										type: "Trimestre 3",
										donneeId: this.classes[index]
									});
							}
						},
	
					]
	
			});

			actionsheet.present();
		}
  	

  	
  }

}