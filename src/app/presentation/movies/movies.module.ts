import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MoviesComponent } from './movies.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { HeaderModule } from '../shared/components/header/header.module';

const routes: Routes = [
  {
    path: '',
    component: MoviesComponent,
  }
];

@NgModule({
  declarations: [MoviesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    InfiniteScrollModule,
    HeaderModule
  ]
})
export class MoviesModule { }
