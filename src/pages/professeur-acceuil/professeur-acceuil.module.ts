import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfesseurAcceuilPage } from './professeur-acceuil';

@NgModule({
  declarations: [
    ProfesseurAcceuilPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfesseurAcceuilPage),
  ],
})
export class ProfesseurAcceuilPageModule {}
