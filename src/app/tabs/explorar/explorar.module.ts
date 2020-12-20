import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ExplorarRoutingModule } from './explorar-routing.module';
import { ExplorarComponent } from './explorar/explorar.component';

@NgModule({
  declarations: [ExplorarComponent],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExplorarRoutingModule
  ],
  exports: [ExplorarComponent]
})
export class ExplorarModule { }
