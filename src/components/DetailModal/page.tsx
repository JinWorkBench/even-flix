import React, { Dispatch, SetStateAction, useRef } from "react";
import useOnClickOutside from "../../hooks/useOnclickOutside";
import ModalHeader from "./components/ModalHeader";
import ModalPoster from "./components/ModalPoster";
import ModalPosterButtons from "./components/ModalPosterButtons";
import ModalInfoSummary from "./components/ModalInfoSummary";

const DetailModal = ({
	setIsModalOpen,
}: {
	setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}) => {
	const ref = useRef<HTMLDivElement | null>(null);
	const [video, setVideo] = useState<VideoDetail | null>(null);

	useOnClickOutside({ ref: ref, handler: () => setIsModalOpen(false) });

	useEffect(() => {
		console.log("open");
		fetchJSON();
	}, []);

	const fetchJSON = async () => {
		try {
		const response = await fetch("../json/movie.json");
		const data = await response.json();
		const mappedMovie = mapMovie(data);
		setVideo(mappedMovie);
		} catch (error) {
			console.log("Error fetch data", error);
		}
	};
	return (
		<div className="presenter z-10 absolute min-h-screen">
			<div className="wrapper-model fixed inset-0 bg-black bg-opacity-70 flex items-start justify-center overflow-auto">
				<div
					className="modal relative bg-neutral-900 w-full max-w-6xl mt-8 mx-2 rounded-lg overflow-auto"
					ref={ref}
				>
					<ModalHeader setIsModalOpen={setIsModalOpen} />
					<ModalPoster>
						<ModalPosterButtons />
					</ModalPoster>

					<ModalInfoSummary />
				</div>
			</div>
		</div>
	);
};

export default DetailModal;
