import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilComponent } from './perfil/perfil.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PerfilRoutingModule } from './perfil-routing.module';

@NgModule({
  declarations: [PerfilComponent],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    PerfilRoutingModule
  ],
  exports: [PerfilComponent]
})
export class PerfilModule { }
