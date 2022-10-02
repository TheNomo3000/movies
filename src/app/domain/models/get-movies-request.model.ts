import { LANGUAGE } from './language.model';

export interface GetMoviesRequest {
  language: LANGUAGE;
  page: number;
  certification: {
    country: string;
    type: string;
  };
  minVotes?: number;
}
