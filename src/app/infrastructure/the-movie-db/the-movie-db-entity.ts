export interface TheMovieDbPageEntity {
  page: number;
  results: TheMovieDbEntity[];
  total_results: number,
  total_pages: number;
}

export interface TheMovieDbEntity {
  poster_path: string,
  adult: boolean,
  overview: string,
  release_date: string,
  id: number,
  original_title: string,
  original_language: string,
  title: string,
  backdrop_path: string,
  popularity: number,
  vote_count: number,
  video: boolean,
  vote_average: number,
}
