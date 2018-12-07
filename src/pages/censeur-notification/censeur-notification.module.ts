import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CenseurNotificationPage } from './censeur-notification';

@NgModule({
  declarations: [
    CenseurNotificationPage,
  ],
  imports: [
    IonicPageModule.forChild(CenseurNotificationPage),
  ],
})
export class CenseurNotificationPageModule {}
