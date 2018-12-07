import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ParentProfilPage } from './parent-profil';

@NgModule({
  declarations: [
    ParentProfilPage,
  ],
  imports: [
    IonicPageModule.forChild(ParentProfilPage),
  ],
})
export class ParentProfilPageModule {}
