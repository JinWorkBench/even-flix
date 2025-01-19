import React, { FC, useState } from "react";
import { Season } from "../../../models/Media";
import { Episodes } from "../../../models/Episodes";
import ModalEpisode from "./ModalEpisode";
import ModalDropdown from "./ModalDropdown";

interface ModalEpisodesProps {
	backdropPath: string;
	seasons: Season[];
	episodes: Episodes;
	selectedSeason: (season: Season) => void;
}

const ModalEpisodes: FC<ModalEpisodesProps> = ({
	backdropPath,
	seasons,
	episodes,
	selectedSeason,
}) => {
	const [season, setSeason] = useState(seasons[seasons.length - 1]);
	const [isShowAll, setIsShowAll] = useState(false);

	const handleSeasonSelect = (season: Season) => {
		setSeason(season);
		selectedSeason(season);
	};

	const handleExpanded = () => {
		setIsShowAll(!isShowAll);
	};

	return (
		<div className="px-12 py-8">
			<div className="grid gap-8 grid-cols-[2fr_1fr]">
				<p className="text-xl font-semibold">회차</p>
				<ModalDropdown
					seasons={seasons}
					onSelect={handleSeasonSelect}
					selectedSeason={season}
				/>
			</div>
			{seasons.length > 1 && (
				<p className="text-sm pt-4">{`${season.name}:`}</p>
			)}
			<div className="flex flex-col justify-start flex-wrap pt-3">
				{(isShowAll ? episodes.episodes : episodes.episodes.slice(0, 5)).map(
					(episode, index) => (
						<ModalEpisode
							key={episode.id}
							backdropPath={backdropPath}
							episode={episode}
							isFocus={index === 0}
						/>
					)
				)}
			</div>
			<div className="flex bottom-0 left-0 w-full h-0.5 bg-neutral-700 justify-center items-center ">
				<button
					className="w-8 h-8 flex items-center justify-center bg-neutral-800 border border-white rounded-full z-10"
					onClick={() => {
						handleExpanded();
					}}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className={`h-4 w-4 transition-transform ${
							isShowAll ? "rotate-180" : ""
						}`}
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M19 9l-7 7-7-7"
						/>
					</svg>
				</button>
			</div>
		</div>
	);
};

export default ModalEpisodes;
