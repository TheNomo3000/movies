export interface TMDBCertificationListEntity {
  certifications: {
    [index: string]: TMDBCertificationEntity[];
  };
}

export interface TMDBCertificationEntity {
  certification: string;
  meaning: string;
  order: number;
}
