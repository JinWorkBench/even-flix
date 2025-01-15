import React, {
	Dispatch,
	FC,
	SetStateAction,
	useEffect,
	useRef,
	useState,
} from "react";
import useOnClickOutside from "../../hooks/useOnclickOutside";
import ModalHeader from "./components/ModalHeader";
import ModalPoster from "./components/ModalPoster";
import ModalPosterButtons from "./components/ModalPosterButtons";
import ModalInfoSummary from "./components/ModalInfoSummary";
import { mapMovie, mapTV, MediaType, Movie, Series } from "./Model/VideoDetail";
import ModalInfoDetail from "./components/ModalInfoDetail";

interface DetailModalProps {
	// id: int,
	mediaType: MediaType;
	setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

const DetailModal: FC<DetailModalProps> = ({ mediaType, setIsModalOpen }) => {
	const ref = useRef<HTMLDivElement | null>(null);
	const [video, setVideo] = useState<Movie | Series | null>(null);

	useOnClickOutside({ ref: ref, handler: () => setIsModalOpen(false) });

	useEffect(() => {
		console.log("open");
		if (mediaType === MediaType.MOVIE) {
			fetchMovieJSON();
		} else if (mediaType === MediaType.TV) {
			fetchTVJSON();
		}
	}, []);

	const fetchMovieJSON = async () => {
		try {
			const response = await fetch("../json/movie.json");
			const data = await response.json();
			const mappedMovie = mapMovie(data);
			setVideo(mappedMovie);
		} catch (error) {
			console.log("Error fetch data", error);
		}
	};

	const fetchTVJSON = async () => {
		try {
			const response = await fetch("../json/series.json");
			const data = await response.json();
			const mappedMovie = mapTV(data);
			setVideo(mappedMovie);
		} catch (error) {
			console.log("Error fetch data", error);
		}
	};

	return (
		<div className="presenter z-10 absolute min-h-screen">
			{video ? (
				<div className="wrapper-model fixed inset-0 bg-black bg-opacity-70 flex items-start justify-center overflow-auto">
					<div
						className="modal relative bg-neutral-900 w-full max-w-6xl mt-8 mx-2 rounded-lg overflow-auto"
						ref={ref}
					>
						(<ModalHeader setIsModalOpen={setIsModalOpen} />
						<ModalPoster video={video}>
							<ModalPosterButtons />
						</ModalPoster>
						<ModalInfoSummary video={video} />
						<ModalInfoDetail video={video} />
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
