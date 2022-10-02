import { LANGUAGE } from './language.model';

export interface GetMoviesRequest {
  language: LANGUAGE;
  page: number;
}
