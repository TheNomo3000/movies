import { Component, HostListener, Inject, OnDestroy, OnInit } from '@angular/core';
import { LANGUAGE } from 'src/app/domain/models/language.model';
import { MovieModel } from 'src/app/domain/models/movie.model';
import { GetTopRatedMovies } from '../../domain/use-case/get-top-rated-movies.usecase';
import { Subject, takeUntil } from 'rxjs';
import { PaginationModel } from '../../domain/models/pagination.model';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit, OnDestroy {
  destroy$: Subject<void> = new Subject<void>();
  movies: MovieModel[] = [];

  constructor(
    private getTopRatedMovies: GetTopRatedMovies
  ) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.getTopRatedMovies.execute({
      language: LANGUAGE.es,
      page: 1
    })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: PaginationModel<MovieModel[]>) => {
          console.log(response);
          this.movies = response.data;
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
