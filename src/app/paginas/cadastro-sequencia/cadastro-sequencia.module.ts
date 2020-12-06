import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastroSequenciaComponent } from './cadastro-sequencia/cadastro-sequencia.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CadastroSequenciaRoutingModule } from './cadastro-sequencia-routing.module';

@NgModule({
  declarations: [CadastroSequenciaComponent],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    CadastroSequenciaRoutingModule
  ],
  exports: [CadastroSequenciaComponent]
})
export class CadastroSequenciaModule { }
