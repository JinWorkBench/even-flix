import React, { FC } from "react";
import { Movie, Series } from "../Model/VideoDetail";

interface ModalPosterProps {
	children: React.ReactNode;
	video: Movie | Series;
}

const ModalPoster: FC<ModalPosterProps> = ({ children, video }) => {
	return (
		<div className="modal__poster-container relative">
			<div className="modal__poster-blur absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-neutral-900"></div>
			<img
				className="modal__poster-img w-full h-auto"
				src={`https://image.tmdb.org/t/p/original/${video.backdropPath}`}
				alt="modal__poster-img"
			/>
			{children}
		</div>
	);
};

export default ModalPoster;
