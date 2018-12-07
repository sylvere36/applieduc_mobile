import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ParentSignInPage } from './parent-sign-in';

@NgModule({
  declarations: [
    ParentSignInPage,
  ],
  imports: [
    IonicPageModule.forChild(ParentSignInPage),
  ],
})
export class ParentSignInPageModule {}
