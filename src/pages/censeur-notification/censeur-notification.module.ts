import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CenseurNotificationPage } from './censeur-notification';
import { RelativeTimesPipe } from '../../pipes/relative-times/relative-times';

@NgModule({
  declarations: [
    CenseurNotificationPage,
    RelativeTimesPipe
  ],
  imports: [
    IonicPageModule.forChild(CenseurNotificationPage),
  ],
})
export class CenseurNotificationPageModule {}
