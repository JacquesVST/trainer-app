import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExerciseEditComponent } from './exercise-edit/exercise-edit.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ExerciseRoutingModule } from './exercise-routing.module';
import { ExerciseListComponent } from './exercise-list/exercise-list.component';



@NgModule({
  declarations: [ExerciseEditComponent, ExerciseListComponent],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExerciseRoutingModule
  ],
  exports: [ExerciseEditComponent, ExerciseListComponent]
})
export class ExerciseModule { }
