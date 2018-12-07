import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfesseurListeClassePage } from './professeur-liste-classe';

@NgModule({
  declarations: [
    ProfesseurListeClassePage,
  ],
  imports: [
    IonicPageModule.forChild(ProfesseurListeClassePage),
  ],
})
export class ProfesseurListeClassePageModule {}
