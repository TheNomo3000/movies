import { Observable } from 'rxjs';
import { GetMoviesRequest } from '../models/get-movies-request.model';
import { MovieModel } from '../models/movie.model';
import { PaginationModel } from '../models/pagination.model';

export abstract class MovieRepository {
  constructor() { }
  abstract getTopRatedMovies(params: GetMoviesRequest): Observable<PaginationModel<MovieModel[]>>;
}
