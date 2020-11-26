import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroAtividadeComponent } from './cadastro-atividade/cadastro-atividade.component';

const routes: Routes = [
  {
    path: '',
    component: CadastroAtividadeComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadastroAtividadeRoutingModule {}
