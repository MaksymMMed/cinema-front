import { ActorReadDto } from "../Actor/ActorReadDto";
import { GenreReadDto } from "../Genre/ActorReadDto";
import { ReviewReadDto } from "../Review/ReviewReadDto";
import { SessionDateTimeDto } from "../Session/SessionDateTimeDto";

export interface MovieDetailsDto {
    id: string;
    name: string;
    description: string;
    directorId: string;
    directorName: string;
    imageUrl: string;
    trailerUrl: string;
    imagesUrls: string[];
    ageRestriction: string;
    duration: number; 
    releaseDate: string;
    movieReviews:ReviewReadDto[];
    genres: GenreReadDto[]; 
    actors: ActorReadDto[]; 
    fiveClosestSessions: SessionDateTimeDto[]; 
    avgMark: number;
  }

  