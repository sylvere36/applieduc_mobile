import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule} from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { IonTextAvatar } from 'ionic-text-avatar';


//Native
import {Network} from '@ionic-native/network';
import {NativeStorage} from '@ionic-native/native-storage';
import { LocalNotifications } from '@ionic-native/local-notifications';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';

//Professeur
import { ProfesseurLoginPage } from '../pages/professeur-login/professeur-login';
import { ProfesseurAcceuilPage } from '../pages/professeur-acceuil/professeur-acceuil';
import { ProfesseurListeClassePage } from '../pages/professeur-liste-classe/professeur-liste-classe';
import { ProfesseurProfilePage } from '../pages/professeur-profile/professeur-profile';
import { ProfesseurListeEleveClassePage } from '../pages/professeur-liste-eleve-classe/professeur-liste-eleve-classe';
import { ProfesseurInsertNotePage } from '../pages/professeur-insert-note/professeur-insert-note';

import { PopoverprofilComponent } from '../components/popoverprofil/popoverprofil';
import { PopoverdeconnexionComponent } from '../components/popoverdeconnexion/popoverdeconnexion';
import { ModalDetailNoteEleveComponent} 
from '../components/modal-detail-note-eleve/modal-detail-note-eleve';

//parent
import { ParentAcceuilPage} from "../pages/parent-acceuil/parent-acceuil";
import { ParentEnfantPage } from "../pages/parent-enfant/parent-enfant";
import { ParentLoginPage } from "../pages/parent-login/parent-login";
import { ParentNotificationPage } from "../pages/parent-notification/parent-notification";
import { ParentProfilPage} from "../pages/parent-profil/parent-profil";
import { ParentSignInPage } from "../pages/parent-sign-in/parent-sign-in";

//censeur
import { CenseurLoginPage } from '../pages/censeur-login/censeur-login';
import { CenseurAcceuilPage } from '../pages/censeur-acceuil/censeur-acceuil';
import { CenseurNotificationPage } from '../pages/censeur-notification/censeur-notification';
import { CenseurProfilPage } from '../pages/censeur-profil/censeur-profil';
import { CenseurViewNotePage } from '../pages/censeur-view-note/censeur-view-note';

import { Api } from '../providers/api/api';
import { ProfesseurProvider } from '../providers/professeur/professeur';
import { SearchPipe } from '../pipes/search/search';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AboutPage,
    
    ProfesseurLoginPage,
    ProfesseurAcceuilPage,
    ProfesseurListeClassePage,
    ProfesseurProfilePage,
    ProfesseurInsertNotePage,
    ProfesseurListeEleveClassePage,

    ParentAcceuilPage,
    ParentEnfantPage,
    ParentLoginPage,
    ParentNotificationPage,
    ParentProfilPage,
    ParentSignInPage,

    CenseurLoginPage,
    CenseurAcceuilPage,
    CenseurNotificationPage,
    CenseurProfilPage,
    CenseurViewNotePage,

    ModalDetailNoteEleveComponent,
    PopoverprofilComponent,
    PopoverdeconnexionComponent,
    IonTextAvatar,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AboutPage,

    ProfesseurLoginPage,
    ProfesseurAcceuilPage,
    ProfesseurListeClassePage,
    ProfesseurProfilePage,
    ProfesseurInsertNotePage,
    ProfesseurListeEleveClassePage,

    ParentAcceuilPage,
    ParentEnfantPage,
    ParentLoginPage,
    ParentNotificationPage,
    ParentProfilPage,
    ParentSignInPage,

    CenseurLoginPage,
    CenseurAcceuilPage,
    CenseurNotificationPage,
    CenseurProfilPage,
    CenseurViewNotePage,

    ModalDetailNoteEleveComponent,
    PopoverprofilComponent,
    PopoverdeconnexionComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Network,
    LocalNotifications,
    NativeStorage,
    Api,
    ProfesseurProvider
  ]
})
export class AppModule {}
