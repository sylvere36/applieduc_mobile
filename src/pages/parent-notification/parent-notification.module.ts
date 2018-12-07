import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ParentNotificationPage } from './parent-notification';

@NgModule({
  declarations: [
    ParentNotificationPage,
  ],
  imports: [
    IonicPageModule.forChild(ParentNotificationPage),
  ],
})
export class ParentNotificationPageModule {}
