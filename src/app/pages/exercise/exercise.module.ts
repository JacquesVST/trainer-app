import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ExerciseEditComponent } from './exercise-edit/exercise-edit.component';
import { ExerciseListComponent } from './exercise-list/exercise-list.component';
import { ExerciseSelectionComponent } from './exercise-selection/exercise-selection.component';
import { ExerciseRoutingModule } from './exercise-routing.module';
import { TagSelectionComponent } from '../tag/tag-selection/tag-selection.component';



@NgModule({
  declarations: [ExerciseEditComponent, ExerciseListComponent, ExerciseSelectionComponent],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExerciseRoutingModule
  ],
  exports: [ExerciseEditComponent, ExerciseListComponent, ExerciseSelectionComponent]
})
export class ExerciseModule { }
