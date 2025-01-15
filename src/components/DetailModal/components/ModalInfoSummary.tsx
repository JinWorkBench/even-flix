import React, { FC } from "react";
import { MediaType, Movie, Series } from "../Model/VideoDetail";
import { Cast } from "../Model/Credit";

interface ModalInfoSummaryProps {
	video: Movie | Series;
	casts: Cast[];
}

// movie 정보 받아와서 id로 credit, keyword 받아오기
const ModalInfoSummary: FC<ModalInfoSummaryProps> = ({ video, casts }) => {
	const convertMinutesToHoursAndMinutes = (totalMinutes: number): string => {
		const hours = Math.floor(totalMinutes / 60); // 시간을 계산
		const minutes = totalMinutes % 60; // 남은 분 계산
		return `${hours}시간 ${minutes}분`;
	};

	const convertReleaseDate = (releaseDate: string): string => {
		const dateStr = "2025-01-13";
		const year = dateStr.split("-")[0];
		return year;
	};

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
		console.log("scrollToBottom");
		const modal: HTMLDivElement = document.querySelector(".wrapper-model") as HTMLDivElement;
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
					출연:
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
				<p className="text-sm text-gray-500">
					영화 특징: {/* map 필요 */}
					{/* 뭔지 모르겟음 keywords? */}
					<a className="text-white hover:underline" href="/">
						상상의 나래
					</a>
				</p>
			</div>
		</div>
	);
};

export default ModalInfoSummary;
