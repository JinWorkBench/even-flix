import React, { FC } from "react";
import { VideoDetail } from "../Model/VideoDetail";

interface ModalInfoSummaryProps {
	video: VideoDetail;
}

// movie 정보 받아와서 id로 credit, keyword 받아오기
const ModalInfoSummary: FC<ModalInfoSummaryProps> = ({ video }) => {
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

	return (
		<div className="modal__content grid grid-cols-3 gap-x-14 px-12">
			<div className="modal__content-info col-span-2">
				{/* (release_date | last_air_date) (number_of_seasons | number_of_episodes | runtime)  */}
				<p className="release-date last_air_date runtime text-gray-400">
					{convertReleaseDate(video.releaseDate)}{" "}
					{video.runtime ? (
						convertMinutesToHoursAndMinutes(video.runtime)
					) : (
						<div>none...</div>
					)}
				</p>
				<p className="text-3xl text-white">{video.title}</p>
				<p className="text-sm text-white">{video.overview}</p>
			</div>
			<div className="flex flex-col gap-y-3 text-sm">
				<p className="text-sm text-gray-500">
					출연: {/* map 필요 */}
					{/* credit에서 상위 세명 */}
					<a className="text-white hover:underline" href="/">
						미야자키하야오
					</a>
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
