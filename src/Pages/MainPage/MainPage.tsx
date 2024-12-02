import { useEffect, useState } from "react"
import { MovieFilteringModel } from "../../DTOs/Movie/MovieFilteringModel"
import { MovieReadDto } from "../../DTOs/Movie/MovieReadDto";
import { getMovies } from "../../Api/MovieApi";
import MovieCard from "../../UI/MovieCard/MovieCard";
import Slider from "../../UI/Slilder/Slider";
import './MainPage.css'

const MainPage = () =>{

    const [movieFilteringModel,setMovieFilteringModel] = useState<MovieFilteringModel>({pageNumber:0,pageSize:6})
    const [movieDetails, setMovieDetails] = useState<MovieReadDto[] | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        console.log(movieFilteringModel)
        const response = await getMovies(movieFilteringModel);
        console.log(response);
        setMovieDetails(response.items);

      } catch (error) {
        console.error('Failed to fetch movie details:', error);
      }
    };
    fetchMovies();
  }, []);

  if (!movieDetails) {
    return <p>Loading...</p>;
  }


    return(
        <div className="main-page">
            <div className="main-banner">
                <Slider style={{width:'30%'}} images={movieDetails.map(x=>x.imageUrl)}/>
            </div>
            <div className="new-movies">
                {movieDetails.map((movie)=>(
                    <MovieCard key={movie.id} movie={movie}/>
                ))}
            </div>
            <div className="promoted-movies">
                {movieDetails.map((movie)=>(
                    <MovieCard key={movie.id} movie={movie}/>
                ))}
            </div>
        </div>
    )
}

export default MainPage