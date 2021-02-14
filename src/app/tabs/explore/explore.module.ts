import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ExploreRoutingModule } from './explore-routing.module';
import { ExploreComponent } from './explore/explore.component';

@NgModule({
  declarations: [ExploreComponent],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreRoutingModule
  ],
  exports: [ExploreComponent]
})
export class ExploreModule { }
