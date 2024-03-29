import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './config/auth-guard';

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/dashboard/dashboard.module').then((m) => m.DashboardModule)
    },
    {
        path: 'login',
        loadChildren: () => import('./pages/login/login.module').then((m) => m.LoginModule)
    },
    {
        path: 'register',
        loadChildren: () => import('./pages/register/register.module').then((m) => m.RegisterModule)
    },
    {
        path: 'exercise',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/exercise/exercise.module').then((m) => m.ExerciseModule)
    },
    {
        path: 'training',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/training/training.module').then((m) => m.TrainingModule)
    },
    {
        path: 'tag',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/tag/tag.module').then((m) => m.TagModule)
    },
    {
        path: 'view',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/view/view.module').then((m) => m.ViewModule)
    },
    {
        path: 'session',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/session/session.module').then((m) => m.SessionModule)
    },
    {
        path: 'profile',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/profile/profile.module').then((m) => m.ProfileModule)
    },
    {
        path: '**',
        redirectTo: '/login',
        pathMatch: 'full'
    }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
