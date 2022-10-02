import { Observable } from 'rxjs';
import { CertificationModel } from '../models/certification.model';
import { GetMoviesRequest } from '../models/get-movies-request.model';
import { MovieModel } from '../models/movie.model';
import { PaginationModel } from '../models/pagination.model';
import { CertificationListModel } from '../models/certification-list.model';

export abstract class MovieRepository {
  constructor() { }
  abstract getTopRatedMovies(params: GetMoviesRequest): Observable<PaginationModel<MovieModel[]>>;
  abstract getCertifications(): Observable<CertificationListModel>;
}
