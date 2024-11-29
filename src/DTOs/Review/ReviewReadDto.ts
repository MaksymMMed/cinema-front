export interface ReviewReadDto{
    id:string;
    movieId:string;
    createdById:string;
    comment:string;
    createdByName:string;
    rank:number;
    createdOnUtc:Date
}