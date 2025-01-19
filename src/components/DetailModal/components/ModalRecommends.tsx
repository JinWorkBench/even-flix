import React, { FC, useState } from "react";
import { Recommend } from "../../../models/Recommend";
import ModalRecommend from "./ModalRecommend";

interface ModalSimilarsProps {
	recommends: Recommend[];
}

const ModalSimilars: FC<ModalSimilarsProps> = ({ recommends }) => {
	const [isShowAll, setIsShowAll] = useState(false);

	const handleExpanded = () => {
		setIsShowAll(!isShowAll);
	};

	return (
		<div className="px-12 py-8">
			<p className="text-xl font-semibold">함께 시청된 콘텐츠</p>
			<div
				className={`grid grid-cols-2 gap-4 pt-4 sm:grid-cols-3   ${
					isShowAll ? "pb-28" : ""
				}`}
			>
				{(isShowAll ? recommends : recommends.slice(0, 5)).map((recommend) => (
					<ModalRecommend key={recommend.id} recommend={recommend} />
				))}
			</div>
			<div className="relative flex">
				<div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-neutral-900 to-transparent"></div>
				<div className="flex bottom-0 left-0 w-full h-0.5 bg-neutral-700 justify-center items-center z-10">
					<button
						className="w-8 h-8 flex items-center justify-center bg-neutral-800 border border-white rounded-full z-20"
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
		</div>
	);
};

export default ModalSimilars;
