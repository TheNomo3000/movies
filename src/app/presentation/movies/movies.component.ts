import { Component, OnDestroy, OnInit } from '@angular/core';
import { LANGUAGE } from 'src/app/domain/models/language.model';
import { MovieModel } from 'src/app/domain/models/movie.model';
import { GetTopRatedMovies } from '../../domain/use-case/get-top-rated-movies.usecase';
import { Subject, takeUntil, Observable, switchMap, filter, map, delay } from 'rxjs';
import { PaginationModel } from '../../domain/models/pagination.model';
import { GetCertifications } from '../../domain/use-case/get-certifications.usecase';
import { CertificationModel } from '../../domain/models/certification.model';
import { UserType } from '../../domain/models/user-type.model';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit, OnDestroy {
  destroy$: Subject<void> = new Subject<void>();
  movies: MovieModel[] = [];
  nextPage: number = 1;
  userType: UserType;
  isLoading: boolean = true;

  constructor(
    private getTopRatedMovies: GetTopRatedMovies,
    private getCertifications: GetCertifications,
  ) {
    this.userType = Number(localStorage.getItem("userType")) ?? 0;
  }

  ngOnInit(): void {
    // Not necesary, but you can use in selector and you can filter movies for certification;
    this.loadCertifications();

    this.getMovies(this.nextPage)
      .pipe(
        switchMap((response: PaginationModel<MovieModel[]>) => {
          this.setMovieData(response);
          return this.getMovies(this.nextPage);
        })
      )
      .subscribe({
        next: (response: PaginationModel<MovieModel[]>) => this.setMovieData(response)
      });
  }

  loadCertifications(): void {
    this.getCertifications.execute()
      .pipe(
        map(m => m["ES"]?.find(f => f.certification === "16")),
        filter(f => Boolean(f)),
        map(m => m as CertificationModel)
      )
      .subscribe({
        next: (certification: CertificationModel) => {
          console.log(certification);
        }
      });
  }

  getMovies(page: number): Observable<PaginationModel<MovieModel[]>> {
    return this.getTopRatedMovies.execute({
      language: LANGUAGE.es,
      page,
      certification: {
        country: "ES",
        type: this.userType === UserType.KID ? "16" : ""
      },
    })
      .pipe(takeUntil(this.destroy$));
  }

  onScrollDown(): void {
    this.isLoading = true;
    this.getMovies(this.nextPage)
      .pipe(delay(500))
      .subscribe({
        next: (response: PaginationModel<MovieModel[]>) => this.setMovieData(response)
      });
  }

  private setMovieData(response: PaginationModel<MovieModel[]>): void {
    this.movies = [...this.movies, ...response.data];
    this.nextPage++;
    this.isLoading = false;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
