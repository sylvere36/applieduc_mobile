import { IonTextAvatar } from 'ionic-text-avatar';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ParentNotificationPage } from './parent-notification';
import { RelativeTimesPipe } from './../../pipes/relative-times/relative-times';


@NgModule({
  declarations: [
    ParentNotificationPage,
    RelativeTimesPipe,
    IonTextAvatar
  ],
  imports: [
    IonicPageModule.forChild(ParentNotificationPage),
  ],
})
export class ParentNotificationPageModule {}
