import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TrainingEditComponent } from './training-edit/training-edit.component';
import { TrainingListComponent } from './training-list/training-list.component';
import { TrainingRoutingModule } from './training-routing.module';



@NgModule({
  declarations: [TrainingEditComponent, TrainingListComponent],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TrainingRoutingModule
  ],
  exports: [TrainingEditComponent, TrainingListComponent]
})
export class TrainingModule { }
