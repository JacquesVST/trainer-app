import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardPageModule)
  },
  {
    path: 'cadastro-atividade',
    loadChildren: () => import('./paginas/cadastro-atividade/cadastro-atividade.module').then(m => m.CadastroAtividadeModule)
  },
  {
    path: 'cadastro-aula',
    loadChildren: () => import('./paginas/cadastro-aula/cadastro-aula.module').then(m => m.CadastroAulaModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./paginas/login/login.module').then(m => m.LoginModule)
  },
  {
    path: '**',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
