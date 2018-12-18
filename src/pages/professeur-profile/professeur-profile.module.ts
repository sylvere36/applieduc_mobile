import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfesseurProfilePage } from './professeur-profile';
import { IonTextAvatar } from 'ionic-text-avatar';

@NgModule({
  declarations: [
    ProfesseurProfilePage,
    IonTextAvatar
  ],
  imports: [
    IonicPageModule.forChild(ProfesseurProfilePage),
  ],
})
export class ProfesseurProfilePageModule {}
