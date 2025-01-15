export enum MediaType {
	VIDEO = "video",
	SERIES = "series",
}

export interface BaseMedia {
	type: MediaType;
	id: number;
	title: string; // 제목
	backdropPath: string; // 모달 상단 이미지
	overview: string; // 간단 설명
	genres: Genre[]; // 장르
	releaseDate: string; // 개봉일
}

export interface VideoDetail extends BaseMedia {
	runtime?: number; // 상영시간
	imdbID: string;
	posterPath: string; // 포스터 이미지
	tagline: string; // ?
	adult: boolean; // ?
}

export interface Series extends BaseMedia {
	createdBy: CreatedBy[];
	numberOfEpisodes: number; // 에피소드 갯수
	numberOfSeasons: number; // 시즌 갯수
	seasons: Season[]; // sort해서 마지막 회차의 season 가져오기?
}

export interface Genre {
	id: number;
	name: string;
}
export interface CreatedBy {
	id: number;
	creditID: string;
	name: string;
}

export interface Season {
	id: number;
	name: string;
	seasonNumber: number;
	airDate: Date;
	episodeCount: number;
	overview: string;
	posterPath: string;
}

export const mapMovie = (json: any): VideoDetail => ({
	type: MediaType.VIDEO,
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

export const mapSeries = (json: any): Series => ({
	type: MediaType.SERIES,
	id: json.id,
	title: json.name,
	backdropPath: json.backdrop_path,
	overview: json.overview,
	genres: json.genres.map((genre: any) => ({
		id: genre.id,
		name: genre.name,
	})),
	releaseDate: json.last_air_date,
	createdBy: json.created_by.map((credit: any) => ({
		id: credit.id,
		creditID: credit.credit_id,
		name: credit.name,
	})),
	numberOfEpisodes: json.number_of_episodes,
	numberOfSeasons: json.number_of_seasons,
	seasons: json.seasons.map((season: any) => ({
		id: season.id,
		name: season.name,
		seasonNumber: season.season_number,
		airDate: season.air_date,
		episodeCount: season.episode_count,
		overview: season.overview,
		posterPath: season.poster_path,
	})),
});
