export type ApiImdbFilm = { 
    id: string;
    primaryTitle: string;
    genres: string[];
    runtimeMinutes: number;
    description: string;
    primaryImage: string;
    releaseDate: { day: number; month: number; year: number; };
    directors: Array<{ fullName: string; }>;
    budget: number;
    grossWorldwide: number;
}

export type ApiImdbGetFilmResponse = Required<ApiImdbFilm>
