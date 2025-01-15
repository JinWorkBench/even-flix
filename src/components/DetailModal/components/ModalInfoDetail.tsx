import React, { FC } from "react";
import { Movie, Series } from "../Model/VideoDetail";
import { Credit, Department } from "../Model/Credit";

interface ModalInfoDetailProps {
	video: Movie | Series;
	credit: Credit;
}

const ModalInfoDetail: FC<ModalInfoDetailProps> = ({ video, credit }) => {
	return (
		<div className="flex flex-col gap-y-1 px-12 py-6">
			<p className="text-xl text-white py-2">{`${video.title} 상세 정보`}</p>
			<p className="text-sm text-gray-500">
				감독:{" "}
				{credit.crew
					.filter(
						(member) => member.knownForDepartment === Department.Directing
					)
					.map((director, index, filteredCrew) => (
						<a
							key={director.id}
							className="text-white hover:underline"
							href="/"
						>
							{director.name}
							{index < filteredCrew.length - 1 && ", "}
						</a>
					))}
			</p>
			<p className="text-sm text-gray-500">
				출연:{" "}
				{credit.cast
					.filter(
						(member) =>
							member.order != null &&
							member.knownForDepartment === Department.Acting
					)
					.map((cast, index, filteredCast) => (
						<a key={cast.id} className="text-white hover:underline" href="/">
							{cast.name}
							{index < filteredCast.length - 1 && ", "}
						</a>
					))}
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
				영화 특징:
				<a key={1} className="text-white hover:underline" href="/">
					상상의 나래, 진심 어린
				</a>
			</p>
		</div>
	);
};

export default ModalInfoDetail;
