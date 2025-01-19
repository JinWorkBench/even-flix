export const convertReleaseDate = (releaseDate: string): string => {
	if (!releaseDate) {
		return "";
	}
	const year = releaseDate.split("-")[0];
	return year;
};

export const convertMinutesToHoursAndMinutes = (
	totalMinutes: number
): string => {
	const hours = Math.floor(totalMinutes / 60); // 시간을 계산
	const minutes = totalMinutes % 60; // 남은 분 계산
	return hours > 0 ? `${hours}시간 ${minutes}분` : `${minutes}분`;
};
