import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfesseurProfilePage } from './professeur-profile';

@NgModule({
  declarations: [
    ProfesseurProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(ProfesseurProfilePage),
  ],
})
export class ProfesseurProfilePageModule {}
