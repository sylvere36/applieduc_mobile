import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CenseurViewNotePage } from './censeur-view-note';

@NgModule({
  declarations: [
    CenseurViewNotePage,
  ],
  imports: [
    IonicPageModule.forChild(CenseurViewNotePage),
  ],
})
export class CenseurViewNotePageModule {}
