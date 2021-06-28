import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LibraryComponent } from './library-component/library.component';
import { LibraryRoutingModule } from './library-routing.module';

@NgModule({
  declarations: [LibraryComponent],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    LibraryRoutingModule
  ],
  exports: [LibraryComponent]
})
export class LibraryModule { }
