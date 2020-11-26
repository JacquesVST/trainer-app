import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroAulaComponent } from './cadastro-aula/cadastro-aula.component';

const routes: Routes = [
  {
    path: '',
    component: CadastroAulaComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadastroAulaRoutingModule {}
