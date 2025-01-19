import React from "react";
import { useNavigate } from "react-router-dom";

interface CardProps {
	id: number;
	backdropPath: string;
}

const Card: React.FC<CardProps> = ({ backdropPath }) => {
	const navigate = useNavigate();

	const handleClickCard = () => {
		// navigate("/movie/1241982");
		navigate("/tv/1408");
	};

	return (
		<div className="relative">
			<button onClick={handleClickCard}>
				<img
					src={backdropPath}
					alt=""
					className="h-auto object-cover rounded-sm"
				/>
			</button>
		</div>
	);
};

export default Card;
