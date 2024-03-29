import { ExerciseModule } from './../exercise/exercise.module';
import { TagSelectionComponent } from './../tag/tag-selection/tag-selection.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivityEditComponent } from './activity-edit/activity-edit.component';
import { ActivityListComponent } from './activity-list/activity-list.component';
import { TrainingEditComponent } from './training-edit/training-edit.component';
import { TrainingListComponent } from './training-list/training-list.component';
import { TrainingRoutingModule } from './training-routing.module';
import { TagModule } from '../tag/tag.module';

@NgModule({
    declarations: [TrainingEditComponent, TrainingListComponent, ActivityEditComponent, ActivityListComponent],
    imports: [IonicModule, CommonModule, FormsModule, TrainingRoutingModule, TagModule, ExerciseModule],
    exports: [TrainingEditComponent, TrainingListComponent, ActivityEditComponent, ActivityListComponent]
})
export class TrainingModule {}
