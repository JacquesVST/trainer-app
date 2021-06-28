import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingRoutingModule { }