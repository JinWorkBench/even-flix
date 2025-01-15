export interface Keywords {
	id: number;
	keywords: Keyword[];
}

export interface Keyword {
	id: number;
	name: string;
}

export const mapKeywords = (json: any): Keywords => ({
	id: json.id,
	keywords: json.keywords.map((keyword: any) => ({
		id: keyword.id,
		name: keyword.name,
	})),
});
