import { ActivityViewComponent } from './activity-view/activity-view.component';
import { LibraryViewComponent } from './library-view/library-view.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivityListViewComponent } from './activity-list-view/activity-list-view.component';
import { TrainingViewComponent } from './training-view/training-view.component';
import { UserViewComponent } from './user-view/user-view.component';

const routes: Routes = [
    {
        path: 'activity/:id',
        component: ActivityViewComponent
    },
    {
        path: 'activity/list/:id',
        component: ActivityListViewComponent
    },
    {
        path: 'library/:id',
        component: LibraryViewComponent
    },
    {
        path: 'training/:id',
        component: TrainingViewComponent
    },
    {
        path: 'user/:id',
        component: UserViewComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ViewRoutingModule {}
