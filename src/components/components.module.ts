import { NgModule } from '@angular/core';
import { ModalDetailNoteEleveComponent } from './modal-detail-note-eleve/modal-detail-note-eleve';
import { PopoverdeconnexionComponent } from './popoverdeconnexion/popoverdeconnexion';
import { ModalViewNotifParentComponent } from './modal-view-notif-parent/modal-view-notif-parent';
@NgModule({
	declarations: [ModalDetailNoteEleveComponent,
    PopoverdeconnexionComponent,
    ModalViewNotifParentComponent],
	imports: [],
	exports: [ModalDetailNoteEleveComponent,
    PopoverdeconnexionComponent,
    ModalViewNotifParentComponent]
})
export class ComponentsModule {}
