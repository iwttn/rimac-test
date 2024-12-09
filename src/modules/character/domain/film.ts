import { formatDate, formatHour, formatCurrency } from 'src/shared/helpers/formats'

export class Film {
    imdbId: string;
    title: string;
    genders: string[];
    duration: string;
    description: string;
    posterImage: string;
    releaseDate: string;
    directors: string[];
    budget: string;
    grossWorldwide: string;

    constructor(
        imdbId: string,
        title: string,
        genders: string[],
        duration: number,
        description: string,
        posterImage: string,
        releaseDate: { day: number; month: number; year: number; },
        directors: string[],
        budget: number,
        grossWorldwide: number
    ) {
        this.imdbId = imdbId;
        this.title = title;
        this.genders = genders;
        this.duration = formatHour(duration);
        this.description = description;
        this.posterImage = posterImage;
        this.releaseDate = formatDate(releaseDate);
        this.directors = directors;
        this.budget = formatCurrency(budget) ;
        this.grossWorldwide = formatCurrency(grossWorldwide);
    }
};