import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation
import { MovieFilteringModel } from "../../DTOs/Movie/MovieFilteringModel";
import { MovieReadDto } from "../../DTOs/Movie/MovieReadDto";
import { getMovies } from "../../Api/MovieApi";
import MovieCard from "../../UI/MovieCard/MovieCard";
import './SearchMoviePage.css';

const SearchMoviePage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get("name");

  const pageNumber = queryParams.get("pageNumber") || "0";
  const pageSize = queryParams.get("pageSize") || "10";

  const [movieFilteringModel, setMovieFilteringModel] = useState<MovieFilteringModel>({
    name: name || '',
    pageNumber: parseInt(pageNumber, 10),
    pageSize: parseInt(pageSize, 10),
    sortingField: 'name',
    currentlyShowing: undefined,
    genresIds: [],
    fromReleaseDate: undefined,
    toReleaseDate: undefined,
  });

  const [movieDetails, setMovieDetails] = useState<MovieReadDto[] | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        console.log('model')
        console.log(movieFilteringModel)
        const response = await getMovies(movieFilteringModel);
        console.log('response')
        console.log(response)
        setMovieDetails(response.items);
      } catch (error) {
        console.error('Failed to fetch movie details:', error);
      }
    };

    if (movieFilteringModel) {
      fetchMovies();
    }
  }, [movieFilteringModel]);

  if (!movieDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className="search-movies">
        {movieDetails.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default SearchMoviePage;
