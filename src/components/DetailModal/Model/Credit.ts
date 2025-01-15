export interface Credit {
	id: number;
	cast: Cast[];
	crew: Cast[];
}

export interface Cast {
	id: number;
	name: string;
	knownForDepartment: Department;
	creditID: string;
	order?: number;
}

export enum Department {
	Acting = "Acting",
	Art = "Art",
	Camera = "Camera",
	Crew = "Crew",
	Directing = "Directing",
	Editing = "Editing",
	Production = "Production",
	Sound = "Sound",
	VisualEffects = "Visual Effects",
	Writing = "Writing",
}

export const mapCredit = (json: any): Credit => ({
	id: json.id,
	cast: json.cast.map((cast: any) => ({
		id: cast.id,
		name: cast.name,
		knownForDepartment: cast.known_for_department,
		creditID: cast.credit_id,
		order: cast.order,
	})),
	crew: json.crew.map((crew: any) => ({
		id: crew.id,
		name: crew.name,
		knownForDepartment: crew.known_for_department,
		creditID: crew.credit_id,
	})),
});

// 출연: order 순서대로 나열
// 감독: cast 내 known_for_department가 Directing
