import React, { FC, useEffect, useRef, useState } from "react";
import useOnClickOutside from "../../hooks/useOnclickOutside";
import ModalHeader from "./components/ModalHeader";
import ModalPoster from "./components/ModalPoster";
import ModalPosterButtons from "./components/ModalPosterButtons";
import ModalInfoSummary from "./components/ModalInfoSummary";
import ModalRecommends from "./components/ModalRecommends";
import {
	mapMovie,
	mapTV,
	MediaType,
	Movie,
	Season,
	Series,
} from "../../models/Media";
import ModalInfoDetail from "./components/ModalInfoDetail";
import { Credit, mapCredit } from "../../models/Credit";
import { Keyword, mapKeywords } from "../../models/Keyword";
import ModalEpisodes from "./components/ModalEpisodes";
import { Episodes, mapEpisodes } from "../../models/Episodes";
import { Recommend, mapRecommend } from "../../models/Recommend";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../api/axios";

interface DetailModalProps {
	mediaType: MediaType;
}

const DetailModal: FC<DetailModalProps> = ({ mediaType }) => {
	const ref = useRef<HTMLDivElement | null>(null);
	const navigate = useNavigate();
	const { id } = useParams<{ id: string }>();

	const [video, setVideo] = useState<Movie | Series | null>(null);
	const [episodes, setEpisodes] = useState<Episodes | null>(null);
	const [credit, setCredit] = useState<Credit | null>(null);
	const [keywords, setKeywords] = useState<Keyword[]>([]);
	const [recommends, setRecommends] = useState<Recommend[]>([]);

	useOnClickOutside({ ref: ref, handler: () => navigate(-1) });

	useEffect(() => {
		if (!id) {
			throw new Error("ID is Missing!");
		}
		fetchCredit(id, mediaType);
		fetchKeyword(id, mediaType);
		fetchRecommend(id, mediaType);
		if (mediaType === MediaType.MOVIE) {
			fetchMovieJSON(id);
		} else if (mediaType === MediaType.TV) {
			fetchTVJSON(id);
		}
	}, [id, mediaType]);

	// 영화 호출
	const fetchMovieJSON = async (id: string) => {
		try {
			const request = await axios.get(`/movie/${id}`);
			const mappedMovie = mapMovie(request.data);
			setVideo(mappedMovie);
		} catch (error) {
			console.log("Error fetch data", error);
		}
	};

	// 시리즈 호출
	const fetchTVJSON = async (id: string) => {
		try {
			const request = await axios.get(`/tv/${id}`);
			const mappedTV = mapTV(request.data);
			setVideo(mappedTV);
			fetchEpisodes(id, mappedTV.numberOfSeasons);
		} catch (error) {
			console.log("Error fetch data", error);
		}
	};

	// 시즌(TV일때만 호출)
	const fetchEpisodes = async (id: string, seasonNumber: number) => {
		try {
			const request = await axios.get(
				`/tv/${id}/season/${seasonNumber.toString()}`
			);
			const mappedSeason = mapEpisodes(request.data);
			setEpisodes(mappedSeason);
		} catch (error) {
			console.log("Error fetch data", error);
		}
	};

	// 출연
	const fetchCredit = async (id: string, movieType: MediaType) => {
		const url =
			mediaType === MediaType.MOVIE
				? `/movie/${id}/credits`
				: `/tv/${id}/credits`;
		try {
			const request = await axios.get(url);
			const mappedCredit = mapCredit(request.data);
			setCredit(mappedCredit);
		} catch (error) {
			console.log("Error fetch data", error);
		}
	};

	// 영화 특징
	const fetchKeyword = async (id: string, movieType: MediaType) => {
		const url =
			mediaType === MediaType.MOVIE
				? `/movie/${id}/keywords`
				: `/tv/${id}/keywords`;
		try {
			const request = await axios.get(url);
			const mappedKeywords = mapKeywords(request.data);
			setKeywords(mappedKeywords);
		} catch (error) {
			console.log("Error fetch data", error);
		}
	};

	// 함께 시청된 콘텐츠
	const fetchRecommend = async (id: string, movieType: MediaType) => {
		const url =
			mediaType === MediaType.MOVIE
				? `/movie/${id}/recommendations`
				: `/tv/${id}/recommendations`;
		try {
			const request = await axios.get(url);
			const mappedRecommend = mapRecommend(request.data);
			setRecommends(mappedRecommend);
		} catch (error) {
			console.log("Error fetch data", error);
		}
	};

	// 시즌 변경 시 호출
	const handleSeasonSelect = (season: Season) => {
		if (!id) {
			throw new Error("ID is Missing!");
		}
		fetchEpisodes(id, season.seasonNumber);
	};

	return (
		<div className="presenter z-10 absolute min-h-screen">
			{video && credit && keywords ? (
				<div className="wrapper-model fixed inset-0 bg-black bg-opacity-70 flex items-start justify-center overflow-auto">
					<div
						className="modal relative bg-neutral-900 w-full max-w-5xl mt-8 mx-2 rounded-lg overflow-auto"
						ref={ref}
					>
						<ModalHeader />
						<ModalPoster video={video}>
							<ModalPosterButtons />
						</ModalPoster>
						<ModalInfoSummary
							video={video}
							casts={credit.cast}
							keywords={keywords}
						/>
						{episodes && (
							<ModalEpisodes
								backdropPath={video.backdropPath}
								seasons={(video as Series).seasons}
								episodes={episodes}
								selectedSeason={handleSeasonSelect}
							/>
						)}
						<ModalRecommends recommends={recommends} />
						<ModalInfoDetail
							video={video}
							credit={credit}
							keywords={keywords}
						/>
					</div>
				</div>
			) : (
				<div>loading...</div>
			)}
			;
		</div>
	);
};

export default DetailModal;
