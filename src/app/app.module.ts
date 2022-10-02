import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MovieRepository } from './domain/repositories/movie.repository';
import { TheMovieDbRepository } from './infrastructure/the-movie-db/the-movie-db.repository';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    { provide: MovieRepository, useClass: TheMovieDbRepository },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
