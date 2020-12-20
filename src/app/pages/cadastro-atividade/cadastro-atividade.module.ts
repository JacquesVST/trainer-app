import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastroAtividadeComponent } from './cadastro-atividade/cadastro-atividade.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CadastroAtividadeRoutingModule } from './cadastro-atividade-routing.module';

@NgModule({
  declarations: [CadastroAtividadeComponent],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    CadastroAtividadeRoutingModule
  ],
  exports: [CadastroAtividadeComponent]
})
export class CadastroAtividadeModule { }
