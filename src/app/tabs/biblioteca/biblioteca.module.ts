import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BibliotecaComponent } from './biblioteca/biblioteca.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BibliotecaRoutingModule } from './biblioteca-routing.module';

@NgModule({
  declarations: [BibliotecaComponent],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    BibliotecaRoutingModule
  ],
  exports: [BibliotecaComponent]
})
export class BibliotecaModule { }
