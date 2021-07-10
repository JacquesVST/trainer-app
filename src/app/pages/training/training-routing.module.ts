import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivityEditComponent } from './activity-edit/activity-edit.component';
import { TrainingEditComponent } from './training-edit/training-edit.component';
import { TrainingListComponent } from './training-list/training-list.component';

const routes: Routes = [
  {
    path: '',
    component: TrainingListComponent,
  },
  {
    path: 'edit/:id',
    component: TrainingEditComponent,
  },
  {
    path: 'new',
    component: TrainingEditComponent,
  },
  {
    path: 'activity/edit/:id',
    component: ActivityEditComponent,
  },
  {
    path: 'activity/new/:training',
    component: ActivityEditComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingRoutingModule { }