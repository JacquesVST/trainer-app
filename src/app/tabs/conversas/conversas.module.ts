import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConversasComponent } from './conversas/conversas.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ConversasRoutingModule } from './conversas-routing.module';

@NgModule({
  declarations: [ConversasComponent],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ConversasRoutingModule
  ],
  exports: [ConversasComponent]
})
export class ConversasModule { }
