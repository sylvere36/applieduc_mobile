import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ParentAcceuilPage } from './parent-acceuil';

@NgModule({
  declarations: [
    ParentAcceuilPage,
  ],
  imports: [
    IonicPageModule.forChild(ParentAcceuilPage),
  ],
})
export class ParentAcceuilPageModule {}
