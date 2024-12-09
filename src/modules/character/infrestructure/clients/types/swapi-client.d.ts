export type ApiSwapiPeople = {
    name: string;
    height: string | number;
    mass: string | number;
    gender: string;
    birth_year: string;
    films: string[];
    url: string;
}

export type ApiSwapiGetAllPeopleResponse<T> = {
    count: number;
    next: string | null;
    previous: string | null;
    results: Array<T>;
}

export type ApiSwapiGetPeopleResponse = Required<ApiSwapiPeople>;