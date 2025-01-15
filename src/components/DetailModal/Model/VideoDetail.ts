export interface VideoDetail {
	id: number;
	title: string; // 제목
	backdropPath: string; // 모달 상단 이미지
	overview: string; // 간단 설명
	genres: Genre[]; // 장르
	releaseDate: string; // 개봉일
	runtime?: number; // 상영시간
	imdbID: string;
	posterPath: string; // 포스터 이미지
	tagline: string; // ?
	adult: boolean; // ?
}

export interface Genre {
	id: number;
	name: string;
}

export interface Series {
	adult: boolean;
	backdropPath: string;
	createdBy: CreatedBy[];
	genres: Genre[];
	homepage: string;
	id: number;
	lastAirDate: Date; // === releaseDate
	name: string; // === title
	numberOfEpisodes: number; // 에피소드 갯수
	numberOfSeasons: number; //
	originalName: string;
	overview: string; // 설명
	posterPath: string;
	seasons: Season[]; // sort해서 마지막 회차의 season 가져오기?
	tagline: string;
}

export interface CreatedBy {
	id: number;
	creditID: string;
	name: string;
	originalName: string;
	gender: number;
	profilePath: string;
}

export interface Season {
	airDate: Date;
	episodeCount: number;
	id: number;
	name: string;
	overview: string;
	posterPath: string;
	seasonNumber: number;
	voteAverage: number;
}

export const mapMovie = (json: any): VideoDetail => ({
	id: json.id,
	title: json.title,
	backdropPath: json.backdrop_path,
	overview: json.overview,
	genres: json.genres.map((genre: any) => ({
		id: genre.id,
		name: genre.name,
	})),
	releaseDate: json.release_date,
	runtime: json.runtime,
	imdbID: json.imdb_id,
	posterPath: json.poster_path,
	tagline: json.tagline,
	adult: json.adult,
});
