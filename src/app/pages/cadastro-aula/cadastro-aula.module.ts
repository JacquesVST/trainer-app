import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastroAulaComponent } from './cadastro-aula/cadastro-aula.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CadastroAulaRoutingModule } from './cadastro-aula-routing.module';

@NgModule({
  declarations: [CadastroAulaComponent],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    CadastroAulaRoutingModule
  ],
  exports: [CadastroAulaComponent]
})
export class CadastroAulaModule { }
