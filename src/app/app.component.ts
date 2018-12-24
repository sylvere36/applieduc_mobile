import { CenseurLoginPage } from './../pages/censeur-login/censeur-login';
import { ParentAcceuilPage } from './../pages/parent-acceuil/parent-acceuil';
import { CenseurAcceuilPage } from './../pages/censeur-acceuil/censeur-acceuil';
import { ParentLoginPage } from './../pages/parent-login/parent-login';
import { ProfesseurLoginPage } from './../pages/professeur-login/professeur-login';
import { ProfesseurAcceuilPage } from './../pages/professeur-acceuil/professeur-acceuil';
import { NativeStorage } from '@ionic-native/native-storage';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    private storage: NativeStorage) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      statusBar.backgroundColorByHexString('#457492');
      splashScreen.hide();

      this.storage.getItem('settings_user')
		  .then(
        data => 
        {
          // {logged: false, identifiant: "", type_user: "censeur"}
          if(data.logged === true)
          {
            switch (data.type_user) {
              case "censeur":
                this.rootPage = CenseurAcceuilPage
                break;
              case "professeur":
                this.rootPage = ProfesseurAcceuilPage
                break;
              case "parent":
                this.rootPage = ParentAcceuilPage
                break;
              default:
                break;
            }
          }else
          {
            switch (data.type_user) {
              case "censeur":
                this.rootPage = CenseurLoginPage
                break;
              case "professeur":
                this.rootPage = ProfesseurLoginPage
                break;
              case "parent":
                this.rootPage = ParentLoginPage
                break;
              default:
                break;
            }
          }
        },
        error => 
        {
          this.rootPage = HomePage;
          // console.error(error);
        });

    });
  }
}

