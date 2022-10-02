import { Injectable } from '@angular/core';
import { UseCase } from '../base/use-case';
import { Observable } from 'rxjs';
import { MovieRepository } from '../repositories/movie.repository';
import { MovieModel } from '../models/movie.model';
import { GetMoviesRequest } from '../models/get-movies-request.model';
import { PaginationModel } from '../models/pagination.model';

@Injectable({
  providedIn: 'root'
})

export class GetTopRatedMovies implements UseCase<GetMoviesRequest, PaginationModel<MovieModel[]>> {
  constructor(private repository: MovieRepository) { }
  execute(params: GetMoviesRequest): Observable<PaginationModel<MovieModel[]>> {
    return this.repository.getTopRatedMovies(params);
  }
}
