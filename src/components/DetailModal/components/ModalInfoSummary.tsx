import React, { FC } from "react";
import { MediaType, Movie, Series } from "../../../models/Media";
import { Cast } from "../../../models/Credit";
import { Keyword } from "../../../models/Keyword";
import {
	convertMinutesToHoursAndMinutes,
	convertReleaseDate,
} from "../../../util/calculate";

interface ModalInfoSummaryProps {
	video: Movie | Series;
	casts: Cast[];
	keywords: Keyword[];
}

// movie 정보 받아와서 id로 credit, keyword 받아오기
const ModalInfoSummary: FC<ModalInfoSummaryProps> = ({
	video,
	casts,
	keywords,
}) => {
	const getRuntimeOrSesaons = (video: Movie | Series): string => {
		switch (video.type) {
			case MediaType.MOVIE:
				const movie = video as Movie;
				return convertMinutesToHoursAndMinutes(movie.runtime);
			case MediaType.TV:
				const series = video as Series;
				if (series.numberOfSeasons > 1) {
					return `시즌 ${series.numberOfSeasons}개`;
				} else {
					return `에피소드 ${series.numberOfEpisodes}개`;
				}
		}
	};

	const scrollToBottom = () => {
		const modal: HTMLDivElement = document.querySelector(
			".wrapper-model"
		) as HTMLDivElement;
		modal.scrollTo({
			top: modal.scrollHeight,
			behavior: "smooth",
		});
	};

	return (
		<div className="modal__content grid grid-cols-3 gap-x-14 px-12">
			<div className="modal__content-info col-span-2">
				<p className="release-date last_air_date runtime text-gray-400">
					{convertReleaseDate(video.releaseDate)} {getRuntimeOrSesaons(video)}
				</p>
				<p className="text-3xl text-white">{video.title}</p>
				<p className="text-sm text-white">{video.overview}</p>
			</div>
			<div className="flex flex-col gap-y-3 text-sm">
				<p className="text-sm text-gray-500">
					출연:{" "}
					{casts.slice(0, 3).map((cast) => (
						<a key={cast.id} className="text-white hover:underline" href="/">
							{`${cast.name}, `}
						</a>
					))}
					{casts.length > 3 && (
						<button
							className="text-white italic hover:underline"
							onClick={() => {
								scrollToBottom();
							}}
						>
							더 보기
						</button>
					)}
				</p>
				<p className="text-sm text-gray-500">
					장르:{" "}
					{video.genres.map((genre, index) => (
						<a key={genre.id} className="text-white hover:underline" href="/">
							{genre.name}
							{index < video.genres.length - 1 && ", "}
						</a>
					))}
				</p>
				{keywords.length > 0 && (
					<p className="text-sm text-gray-500">
						영화 특징:{" "}
						{keywords.slice(0, 3).map((keyword, index) => (
							<a
								key={keyword.id}
								className="text-white hover:underline"
								href="/"
							>
								{keyword.name}
								{index < 2 && ", "}
							</a>
						))}
					</p>
				)}
			</div>
		</div>
	);
};

export default ModalInfoSummary;
