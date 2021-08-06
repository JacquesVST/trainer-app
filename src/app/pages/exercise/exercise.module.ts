import { ExerciseFilesComponent } from './exercise-files/exercise-files.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ExerciseEditComponent } from './exercise-edit/exercise-edit.component';
import { ExerciseListComponent } from './exercise-list/exercise-list.component';
import { ExerciseRoutingModule } from './exercise-routing.module';
import { ExerciseSelectionComponent } from './exercise-selection/exercise-selection.component';

@NgModule({
    declarations: [ExerciseEditComponent, ExerciseListComponent, ExerciseSelectionComponent, ExerciseFilesComponent],
    imports: [IonicModule, CommonModule, FormsModule, ExerciseRoutingModule],
    exports: [ExerciseEditComponent, ExerciseListComponent, ExerciseSelectionComponent, ExerciseFilesComponent]
})
export class ExerciseModule {}
