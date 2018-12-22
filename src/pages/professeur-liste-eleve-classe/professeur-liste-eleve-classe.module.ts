import { SearchPipe } from './../../pipes/search/search';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfesseurListeEleveClassePage } from './professeur-liste-eleve-classe';

@NgModule({
  declarations: [
    ProfesseurListeEleveClassePage,
    SearchPipe
  ],
  imports: [
    IonicPageModule.forChild(ProfesseurListeEleveClassePage),
  ],
})
export class ProfesseurListeEleveClassePageModule {}
