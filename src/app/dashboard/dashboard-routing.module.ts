import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPage } from './dashboard/dashboard.page';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardPage,
    children: [
      {
        path: 'explore',
        loadChildren: () => import('../tabs/explore/explore.module').then(m => m.ExploreModule)
      },
      {
        path: 'library',
        loadChildren: () => import('../tabs/library/library.module').then(m => m.LibraryModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../tabs/profile/profile.module').then(m => m.ProfileModule)
      },
      {
        path: '',
        redirectTo: '/dashboard/explore',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/dashboard/explore',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardPageRoutingModule { }
