import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckCertificationGuard } from './presentation/shared/guards/check-certification.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('./presentation/home/home.module').then(module => module.HomeModule)
  },
  {
    path: 'movies',
    loadChildren: () => import('./presentation/movies/movies.module').then(module => module.MoviesModule),
    canActivate: [CheckCertificationGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
