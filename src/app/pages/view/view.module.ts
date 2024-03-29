import { ExerciseModule } from './../exercise/exercise.module';
import { TrainingModule } from './../training/training.module';
import { ActivityViewComponent } from './activity-view/activity-view.component';
import { ActivityListViewComponent } from './activity-list-view/activity-list-view.component';
import { TrainingViewComponent } from './training-view/training-view.component';
import { UserViewComponent } from './user-view/user-view.component';
import { LibraryViewComponent } from './library-view/library-view.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ViewRoutingModule } from './view-routing.module';
import { SessionViewComponent } from './session-view/session-view.component';

@NgModule({
    declarations: [
        ActivityViewComponent,
        ActivityListViewComponent,
        LibraryViewComponent,
        TrainingViewComponent,
        UserViewComponent,
        SessionViewComponent
    ],
    imports: [IonicModule, CommonModule, FormsModule, ViewRoutingModule, TrainingModule, ExerciseModule],
    exports: [LibraryViewComponent, ActivityViewComponent]
})
export class ViewModule {}
