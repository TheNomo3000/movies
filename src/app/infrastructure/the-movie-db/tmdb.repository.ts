import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { MovieModel } from 'src/app/domain/models/movie.model';
import { MovieRepository } from 'src/app/domain/repositories/movie.repository';
import { HttpClient } from '@angular/common/http';
import { GetMoviesRequest } from 'src/app/domain/models/get-movies-request.model';
import { PaginationModel } from '../../domain/models/pagination.model';
import { TheMovieDbPageRepositoryMapper } from './the-movie-db-mapper';
import { TheMovieDbPageEntity } from './the-movie-db-entity';
import { TMDBCertificationMapper } from './tmdb-cert-mapper';
import { TMDBCertificationListEntity } from './tmdb-cert-entity';
import { CertificationListModel } from '../../domain/models/certification-list.model';

const API_KEY = "api_key=b194194954a1e2b3515bed02aa0f04c0";
const BASE_URL = `https://api.themoviedb.org/3/`;

@Injectable({ providedIn: 'root' })
export class TheMovieDbRepository extends MovieRepository {
  private mapper = new TheMovieDbPageRepositoryMapper();
  private mapperCertification = new TMDBCertificationMapper();

  constructor(private httpClient: HttpClient) {
    super();
  }

  getTopRatedMovies(params: GetMoviesRequest): Observable<PaginationModel<MovieModel[]>> {
    let url = BASE_URL + `discover/movie?${API_KEY}&language=${params.language}&page=${params.page}`;
    url += `&sort_by=vote_average.desc&vote_count.gte=${params.minVotes ?? 300}&certification_country=${params.certification.country}&certification.lte=${params.certification.type}`;

    return this.httpClient.get<TheMovieDbPageEntity>(url).pipe(map(this.mapper.mapFrom));
  };

  getCertifications(): Observable<CertificationListModel> {
    const url = BASE_URL + `certification/movie/list?${API_KEY}`;

    return this.httpClient.get<TMDBCertificationListEntity>(url).pipe(map(this.mapperCertification.mapFrom));
  }
}
