export interface Keyword {
	id: number;
	name: string;
}

export const mapKeywords = (json: any): Keyword[] => {
	if (json.keywords) {
		return json.keywords.map((keyword: any) => ({
			id: keyword.id,
			name: keyword.name,
		}));
	}

	if (json.results) {
		return json.results.map((keyword: any) => ({
			id: keyword.id,
			name: keyword.name,
		}));
	}
	return []; // keywords와 results 모두 없으면 빈 배열 반환
};
