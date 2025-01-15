import React from "react";

// movie 정보 받아와서 id로 credit, keyword 받아오기
const ModalInfoSummary = () => {
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
					{convertReleaseDate("2025-01-13")}{" "}
					{convertMinutesToHoursAndMinutes(124)}
				</p>
				{/* (title | name) */}
				<p className="text-3xl text-white">영화는 title TV는 name</p>
				<p className="text-sm text-white">
					여기는 overview 평범한 열 살 짜리 소녀 치히로 식구는 이사 가던 중 길을
					잘못 들어 낡은 터널을 지나가게 된다. 터널 저편엔 폐허가 된 놀이공원이
					있었고 그곳엔 이상한 기운이 흘렀다. 인기척 하나 없는 이 마을의 낯선
					분위기에 불길한 기운을 느낀 치히로는 부모님에게 돌아가자고 조르지만
					부모님은 호기심에 들떠 마을 곳곳을 돌아다니기 시작한다. 어느 음식점에
					도착한 치히로의 부모님은 그 곳에 차려진 음식들을 보고 즐거워하며
					허겁지겁 먹어대다가 돼지로 변해버린다. 겁에 질려 당황하는 치히로에게
					낯선 소년 하쿠가 나타나 빨리 이곳을 나가라고 소리치는데..."
				</p>
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
					장르: {/* map 필요 */}
					{/* genres id, name */}
					<a className="text-white hover:underline" href="/">
						가족영화
					</a>
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
