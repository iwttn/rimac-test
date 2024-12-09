import { Film } from './film'

export class Fusion {
    id: string;
    characterName: string;
    characterHeight: string;
    characterMass: string;
    characterGender: string;
    characterBirthyear: string;
    films: Film[];

    constructor(
        id: string,
        characterName: string,
        characterHeight: string | number,
        characterMass: string | number,
        characterGender: string,
        characterBirthyear: string,
        films: Film[]
    ) {
        this.id = id;
        this.characterName = characterName;
        this.characterHeight = `${characterHeight}cm`;
        this.characterMass = `${characterMass}kg`;
        this.characterGender = characterGender;
        this.characterBirthyear = characterBirthyear;
        this.films = films;
    }
}