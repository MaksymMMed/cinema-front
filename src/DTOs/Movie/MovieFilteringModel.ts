export interface MovieFilteringModel{
    name?:string;
    directorId?:string;
    fromReleaseDate?:string;
    toReleaseDate?:string;
    genresIds?:string[]
    currentlyShowing?:boolean;
}