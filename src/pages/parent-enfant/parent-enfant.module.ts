import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ParentEnfantPage } from './parent-enfant';

@NgModule({
  declarations: [
    ParentEnfantPage,
  ],
  imports: [
    IonicPageModule.forChild(ParentEnfantPage),
  ],
})
export class ParentEnfantPageModule {}
