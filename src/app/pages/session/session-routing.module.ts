import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinishSessionComponent } from './finish-session/finish-session.component';
import { SessionComponent } from './session/session.component';

const routes: Routes = [
    {
        path: 'new/:id',
        component: SessionComponent
    },
    {
        path: 'finish/:id',
        component: FinishSessionComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SessionRoutingModule {}
