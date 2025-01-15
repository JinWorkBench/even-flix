export interface Movie {
  adult:                boolean;
  backdrop_path:        string;
  genres:               Genre[];
  id:                   number;
  imdb_id:              string;
  origin_country:       string[];
  overview:             string;
  poster_path:          string;
  production_companies: ProductionCompany[];
  release_date:         Date;
  runtime:              number;
  status:               string;
  tagline:              string;
  title:                string;
  video:                boolean;
}

export interface Genre {
  id:   number;
  name: string;
}

export interface ProductionCompany {
  id:             number;
  logo_path:      string;
  name:           string;
  origin_country: string;
}
