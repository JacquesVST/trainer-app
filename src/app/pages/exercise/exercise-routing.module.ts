import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExerciseEditComponent } from './exercise-edit/exercise-edit.component';
import { ExerciseListComponent } from './exercise-list/exercise-list.component';

const routes: Routes = [
    {
        path: '',
        component: ExerciseListComponent
    },
    {
        path: 'edit/:id',
        component: ExerciseEditComponent
    },
    {
        path: 'new',
        component: ExerciseEditComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ExerciseRoutingModule {}
