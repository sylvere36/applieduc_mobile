import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CenseurLoginPage } from './censeur-login';

@NgModule({
  declarations: [
    CenseurLoginPage,
  ],
  imports: [
    IonicPageModule.forChild(CenseurLoginPage),
  ],
})
export class CenseurLoginPageModule {}
