import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfesseurLoginPage } from './professeur-login';

@NgModule({
  declarations: [
    ProfesseurLoginPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfesseurLoginPage),
  ],
})
export class ProfesseurLoginPageModule {}
