import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { MovieModel } from 'src/app/domain/models/movie.model';
import { MovieRepository } from 'src/app/domain/repositories/movie.repository';
import { HttpClient } from '@angular/common/http';
import { GetMoviesRequest } from 'src/app/domain/models/get-movies-request.model';
import { PaginationModel } from '../../domain/models/pagination.model';
import { TheMovieDbPageRepositoryMapper, TheMovieDbRepositoryMapper } from './the-movie-db-mapper';
import { TheMovieDbPageEntity } from './the-movie-db-entity';

const API_KEY = "?api_key=b194194954a1e2b3515bed02aa0f04c0";
const BASE_URL = `https://api.themoviedb.org/3/movie/top_rated${API_KEY}`;

@Injectable({ providedIn: 'root' })
export class TheMovieDbRepository extends MovieRepository {
  private mapper = new TheMovieDbPageRepositoryMapper();
  constructor(private httpClient: HttpClient) {
    super();
  }

  getTopRatedMovies(params: GetMoviesRequest): Observable<PaginationModel<MovieModel[]>> {
    const url = BASE_URL + `&language=${params.language}&page=${params.page}`;

    return this.httpClient.get<TheMovieDbPageEntity>(url).pipe(map(this.mapper.mapFrom));
  };
}
