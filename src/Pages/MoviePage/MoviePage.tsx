import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './MoviePage.css';
import Slider from '../../UI/Slilder/Slider';
import { MovieDetailsDto } from '../../DTOs/Movie/MovieDetailsDto';
import { getMovieDetails } from '../../Api/MovieApi';
import Button from '../../UI/Button/Button';
import CommentCard from '../../UI/CommentCard/CommentCard';
import SessionCard from '../../UI/SessionCard/SessionCard';
import Input from '../../UI/Input/Input';
import { ReviewCreateDto } from '../../DTOs/Review/ReviewCreateDto';
import { createReview } from '../../Api/ReviewApi';

const MoviePage = () => {
	const navigate = useNavigate();
	const { id } = useParams<{ id: string }>();
	const [movieDetails, setMovieDetails] = useState<MovieDetailsDto | null>(null);
	const [reviewCreateDto, setReviewCreateDto] = useState<ReviewCreateDto>({
		movieId: '',
		comment: '',
		rank: 0,
	});

	const [error, setError] = useState<string | null>(null);

	const fetchMovieDetails = async () => {
		try {
			if (id) {
				const response = await getMovieDetails(id);
				setMovieDetails(response);
				setReviewCreateDto((prev) => ({ ...prev, movieId: response.id }));
			}
		} catch (err) {
			setError('Failed to fetch movie details.');
		}
	};

	useEffect(() => {
		fetchMovieDetails();
	},[id]);

	const handleBooking = () => {
		if(movieDetails?.fiveClosestSessions.length === 0) {
			alert("There is no available sessions!")
			return
		}
		navigate(`/booking?sessionId=${movieDetails?.fiveClosestSessions[0].sessionId}`);
	};

	const handleCreateReview = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const response = await createReview(reviewCreateDto);
			console.log(response);
			fetchMovieDetails();
		} catch (err: any) {
			alert(err);
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		if (name === 'rank' && (+value < 1 || +value > 10)) return;
		setReviewCreateDto((prev) => ({ ...prev, [name]: value }));
	};

	if (!movieDetails) {
		return <p>Loading...</p>;
	}

	return (
		<div className="container" style={{ margin: 'auto', padding: '10px 40px' }}>
			<div className="movie-slider">
				{movieDetails.imagesUrls && movieDetails.imagesUrls.length > 0 && (
					<Slider
						autoSlide={3000}
						elements={movieDetails.imagesUrls.map((url) => (
							<>
								<img src={url} alt={movieDetails.name} />
							</>
						))}
					/>
				)}
			</div>
			<div className="movie-info">
				<div className="small-banner-movie-info">
					<img src={movieDetails.smallPosterImageUrl} alt={movieDetails.name} />
					<Button onClick={handleBooking} style={{ marginTop: '10px' }} size="xl">
						Booking
					</Button>
				</div>
				<div className="movie-description">
					<h1>{movieDetails.name}</h1>
					<p>
						<strong>Director:</strong> {movieDetails.directorName}
					</p>
					<p>
						<strong>Actors:</strong> {movieDetails.actors.map((x) => x.name).join(', ')}
					</p>
					<p>
						<strong>Genres:</strong> {movieDetails.genres.map((x) => x.name).join(', ')}
					</p>
					<p>
						<strong>Release Date:</strong> {new Date(movieDetails.releaseDate).toLocaleDateString()}
					</p>
					<p>
						<strong>Duration:</strong> {movieDetails.duration} minutes
					</p>
					<p>
						<strong>Average Rating:</strong> {movieDetails.avgMark.toFixed(1)}
					</p>
					<p>
						<strong>Age Restriction:</strong> {movieDetails.ageRestriction}
					</p>
					<p>{movieDetails.description}</p>
				</div>
			</div>
			<div className="closest-sessions">
				{movieDetails.fiveClosestSessions.length > 0 ? (
					movieDetails.fiveClosestSessions.map((session) => (
						<Link
							className='session-link'
							to={`/booking?sessionId=${session.sessionId}`}>
							<SessionCard key={session.sessionId} session={session} />
						</Link>
					))
				) : (
					<p style={{ margin: 'auto' }}>There is no available sessions.</p>
				)}
			</div>
			<div className="similar-movies">{/* Add similar movies here */}</div>
			<div className="leave-review-section">
				<img
					src="https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png"
					alt="user logo"
				/>
				<form onSubmit={handleCreateReview} className="write-review">
					<div style={{ display: 'flex' }}>
						<Input
							name="comment"
							onChange={handleChange}
							required={true}
							size="xl"
							placeholder="Leave your review..."
						/>
						<Input
							name="rank"
							onChange={handleChange}
							required={true}
							style={{ marginLeft: '3px' }}
							size="s"
							placeholder="Set rank from 1 to 10..."
						/>
					</div>
					<Button size="s" type="submit" style={{ marginTop: '6px' }}>
						Add
					</Button>
				</form>
			</div>
			<div className="reviews">
				{movieDetails.movieReviews.length > 0 ? (
					movieDetails.movieReviews.map((review) => (
						<CommentCard
							key={review.id}
							createdBy={review.createdByName}
							comment={review.comment}
							rank={review.rank}
							style={{ marginTop: '15px' }}
						/>
					))
				) : (
					<p>There are no comments, be the first to leave a review.</p>
				)}
			</div>
		</div>
	);
};

export default MoviePage;
