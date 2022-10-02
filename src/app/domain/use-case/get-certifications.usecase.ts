import { Injectable } from '@angular/core';
import { UseCase } from '../base/use-case';
import { Observable } from 'rxjs';
import { MovieRepository } from '../repositories/movie.repository';
import { CertificationListModel } from '../models/certification-list.model';

@Injectable({
  providedIn: 'root'
})

export class GetCertifications implements UseCase<void, CertificationListModel> {
  constructor(private repository: MovieRepository) { }
  execute(): Observable<CertificationListModel> {
    return this.repository.getCertifications();
  }
}
