import { SessionListComponent } from './session-list/session-list.component';
import { FinishSessionComponent } from './finish-session/finish-session.component';
import { ViewModule } from './../view/view.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SessionRoutingModule } from './session-routing.module';
import { SessionComponent } from './session/session.component';

@NgModule({
    declarations: [SessionComponent, FinishSessionComponent, SessionListComponent],
    imports: [IonicModule, CommonModule, FormsModule, SessionRoutingModule, ViewModule],
    exports: [SessionComponent, FinishSessionComponent, SessionListComponent]
})
export class SessionModule {}
