import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ExerciseEditComponent } from './exercise-edit/exercise-edit.component';
import { ExerciseListComponent } from './exercise-list/exercise-list.component';
import { ExerciseRoutingModule } from './exercise-routing.module';
import { TagSelectionComponent } from './tag-selection/tag-selection.component';



@NgModule({
  declarations: [ExerciseEditComponent, ExerciseListComponent, TagSelectionComponent],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExerciseRoutingModule
  ],
  exports: [ExerciseEditComponent, ExerciseListComponent, TagSelectionComponent]
})
export class ExerciseModule { }