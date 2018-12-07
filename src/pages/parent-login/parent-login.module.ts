import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ParentLoginPage } from './parent-login';

@NgModule({
  declarations: [
    ParentLoginPage,
  ],
  imports: [
    IonicPageModule.forChild(ParentLoginPage),
  ],
})
export class ParentLoginPageModule {}
