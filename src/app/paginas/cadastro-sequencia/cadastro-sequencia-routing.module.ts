import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroSequenciaComponent } from './cadastro-sequencia/cadastro-sequencia.component';

const routes: Routes = [
  {
    path: '',
    component: CadastroSequenciaComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadastroSequenciaRoutingModule {}
