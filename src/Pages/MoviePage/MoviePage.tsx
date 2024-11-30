import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import './MoviePage.css';
import Slider from "../../UI/Slilder/Slider";
import { MovieDetailsDto } from "../../DTOs/Movie/MovieDetailsDto";
import { getMovieDetails } from "../../Api/MovieApi";
import Button from "../../UI/Button/Button";
import CommentCard from "../../UI/CommentCard/CommentCard";
import SessionCard from "../../UI/SessionCard/SessionCard";

const MoviePage = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>();
  const [movieDetails, setMovieDetails] = useState<MovieDetailsDto | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        if (id) {
          const response = await getMovieDetails(id);
          console.log(response);
          setMovieDetails(response);
        }
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
      }
    };
    fetchMovieDetails();
  }, [id]);

  const handleBooking = () =>{
    navigate(`/booking?sessionId=${movieDetails?.fiveClosestSessions[0].sessionId}`);
  }

  if (!movieDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className="movie-slider">
        {movieDetails.imagesUrls && movieDetails.imagesUrls.length > 0 && (
          <Slider images={movieDetails.imagesUrls} />
        )}
      </div>
      <div className="movie-info">
        <div className="small-banner">
          <img src={movieDetails.imageUrl} alt={movieDetails.name} />
          <Button onClick={handleBooking} style={{marginTop:'20px'}} size="xl">Booking</Button>
        </div>
        <div className="movie-description">
          <h1>{movieDetails.name}</h1>
          <p><strong>Director:</strong> {movieDetails.directorName}</p>
          <p><strong>Actors:</strong> {movieDetails.actors.map(x => x.name).join(', ')}</p>
          <p><strong>Genres:</strong> {movieDetails.genres.map(x => x.name).join(', ')}</p>
          <p><strong>Release Date:</strong> {new Date(movieDetails.releaseDate).toLocaleDateString()}</p>
          <p><strong>Duration:</strong> {movieDetails.duration} minutes</p>
          <p><strong>Average Rating:</strong> {movieDetails.avgMark.toFixed(1)}</p>
          <p><strong>Age Restriction:</strong> {movieDetails.ageRestriction}</p>
          <p>{movieDetails.description}</p>
        </div>  
      </div>
      <div className="closest-sessions">
        {movieDetails.fiveClosestSessions.map((session)=>(
          <Link style={{ textDecoration: 'none'}} to={`/booking?sessionId=${session.sessionId}`}>
            <SessionCard key={session.sessionId} session={session}/>
          </Link>
        ))}
      </div>
      <div className="similar-movies">
        {/* Add similar movies here */}
      </div>
      <div className="reviews">
        {movieDetails.movieReviews.map((review)=>(
          <CommentCard key={review.id} createdBy={review.createdByName}
          comment={review.comment} rank={review.rank} style={{marginTop:'15px'}}/>
        ))}
        
      </div>
    </div>
  );
};

export default MoviePage;
