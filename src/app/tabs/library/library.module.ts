import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibraryComponent } from './library-component/library.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
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
