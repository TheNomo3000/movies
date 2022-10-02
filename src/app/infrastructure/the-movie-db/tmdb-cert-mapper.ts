import { Mapper } from '../../domain/base/mapper';
import { TMDBCertificationListEntity } from './tmdb-cert-entity';
import { CertificationListModel } from 'src/app/domain/models/certification-list.model';


export class TMDBCertificationMapper implements Mapper<TMDBCertificationListEntity, CertificationListModel> {
  mapFrom(param: TMDBCertificationListEntity): CertificationListModel {
    return param.certifications;
  }

  mapTo(param: CertificationListModel): TMDBCertificationListEntity {
    return {
      certifications: {}
    };
  }
}
