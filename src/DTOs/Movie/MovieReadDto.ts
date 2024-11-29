import { ActorReadDto } from "../Actor/ActorReadDto";
import { GenreReadDto } from "../Genre/ActorReadDto";

export interface MovieReadDto {
    id: string;
    name: string;
    directorId: string;
    directorName: string;
    imageUrl: string;
    trailerUrl: string;
    ageRestriction: string;
    duration: number; 
    releaseDate: string;
    genres: GenreReadDto[]; 
    actors: ActorReadDto[]; 
    avgMark: number;
  }

  