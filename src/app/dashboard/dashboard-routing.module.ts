import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPage } from './dashboard/dashboard.page';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardPage,
    children: [
      {
        path: 'explorar',
        loadChildren: () => import('../tabs/explorar/explorar.module').then(m => m.ExplorarModule)
      },
      {
        path: 'biblioteca',
        loadChildren: () => import('../tabs/biblioteca/biblioteca.module').then(m => m.BibliotecaModule)
      },
      {
        path: 'perfil',
        loadChildren: () => import('../tabs/perfil/perfil.module').then(m => m.PerfilModule)
      },
      {
        path: 'conversas',
        loadChildren: () => import('../tabs/conversas/conversas.module').then(m => m.ConversasModule)
      },
      {
        path: '',
        redirectTo: '/dashboard/explorar',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/dashboard/explorar',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardPageRoutingModule { }
