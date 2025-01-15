import React, { FC } from "react";
import { VideoDetail } from "../Model/VideoDetail";

interface ModalInfoDetailProps {
	video: VideoDetail;
}

const ModalInfoDetail: FC<ModalInfoDetailProps> = ({ video }) => {
	return (
		<div className="flex flex-col gap-y-1 px-12 py-6">
			<p className="text-xl text-white py-2">{`${video.title} 상세 정보`}</p>
			<p className="text-sm text-gray-500">
				감독:
				<a key={1} className="text-white hover:underline" href="/">
					미야자기 하야오
				</a>
			</p>
			<p className="text-sm text-gray-500">
				출연:
				<a key={1} className="text-white hover:underline" href="/">
					히이라기 무리, 이리노 미유, 나쓰키마리, 히이라기 무리, 이리노 미유,
					나쓰키마리,
				</a>
			</p>
			<p className="text-sm text-gray-500">
				장르:
				<a key={1} className="text-white hover:underline" href="/">
					가족 영화, 어린이, 애니메이션
				</a>
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
