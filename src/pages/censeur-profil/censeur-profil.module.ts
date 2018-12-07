import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CenseurProfilPage } from './censeur-profil';

@NgModule({
  declarations: [
    CenseurProfilPage,
  ],
  imports: [
    IonicPageModule.forChild(CenseurProfilPage),
  ],
})
export class CenseurProfilPageModule {}
