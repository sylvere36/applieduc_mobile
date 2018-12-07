import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CenseurAcceuilPage } from './censeur-acceuil';

@NgModule({
  declarations: [
    CenseurAcceuilPage,
  ],
  imports: [
    IonicPageModule.forChild(CenseurAcceuilPage),
  ]
})
export class CenseurAcceuilPageModule {}
