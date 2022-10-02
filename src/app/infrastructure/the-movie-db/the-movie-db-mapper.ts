import { Mapper } from '../../domain/base/mapper';
import { TheMovieDbEntity, TheMovieDbPageEntity } from './the-movie-db-entity';
import { MovieModel } from '../../domain/models/movie.model';
import { PaginationModel } from 'src/app/domain/models/pagination.model';


export class TheMovieDbPageRepositoryMapper implements Mapper<TheMovieDbPageEntity, PaginationModel<MovieModel[]>> {

  mapFrom(param: TheMovieDbPageEntity): PaginationModel<MovieModel[]> {
    const movieMapper: TheMovieDbRepositoryMapper = new TheMovieDbRepositoryMapper();

    return {
      page: param.page,
      data: param.results.map(movieMapper.mapFrom),
      totalPages: param.total_pages,
      totalResults: param.total_results,
    };

  }

  mapTo(param: PaginationModel<MovieModel[]>): TheMovieDbPageEntity {
    const movieMapper: TheMovieDbRepositoryMapper = new TheMovieDbRepositoryMapper();

    return {
      page: param.page,
      total_pages: param.totalPages,
      total_results: param.totalResults,
      results: param.data.map(movieMapper.mapTo),
    };
  }
}

export class TheMovieDbRepositoryMapper implements Mapper<TheMovieDbEntity, MovieModel> {
  mapFrom(param: TheMovieDbEntity): MovieModel {
    return {
      poster: param.poster_path,
      title: param.title,
      description: param.overview,
      releaseDate: param.release_date,
      voteAverage: param.vote_average
    };
  }

  mapTo(param: MovieModel): TheMovieDbEntity {
    return {
      poster_path: param.poster,
      adult: false,
      overview: param.description,
      release_date: param.releaseDate,
      id: 0,
      original_title: "",
      original_language: "",
      title: param.title,
      backdrop_path: "",
      popularity: 0,
      vote_count: 0,
      video: false,
      vote_average: param.voteAverage,
    };
  }
}
