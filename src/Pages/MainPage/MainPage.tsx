import { useEffect, useState } from 'react';
import { MovieFilteringModel } from '../../DTOs/Movie/MovieFilteringModel';
import { MovieReadDto } from '../../DTOs/Movie/MovieReadDto';
import { getMovies } from '../../Api/MovieApi';
import MovieCard from '../../UI/MovieCard/MovieCard';
import Slider from '../../UI/Slilder/Slider';
import './MainPage.css';

const MainPage = () => {
	const [movieFilteringModel, setMovieFilteringModel] = useState<MovieFilteringModel>({
		pageNumber: 0,
		pageSize: 6,
	});
	const [movieDetails, setMovieDetails] = useState<MovieReadDto[] | null>(null);

	useEffect(() => {
		const fetchMovies = async () => {
			try {
				console.log(movieFilteringModel);
				const response = await getMovies(movieFilteringModel);
				console.log(response);
				setMovieDetails(response.items);
			} catch (error) {
				console.error('Failed to fetch movie details:', error);
			}
		};
		fetchMovies();
	}, [movieFilteringModel]);

	if (!movieDetails) {
		return <p>Loading...</p>;
	}

	const itemsPerSlide = 4;

	const newReleasesSlides = [];
	for (let i = 0; i < movieDetails.length; i += itemsPerSlide) {
		const slideItems = movieDetails
			.slice(i, i + itemsPerSlide)
			.map((movie) => <MovieCard key={movie.id} movie={movie} />);
		newReleasesSlides.push(<div className="slide-grid">{slideItems}</div>);
	}

	const promotedSlides = [];
	for (let i = 0; i < movieDetails.length; i += itemsPerSlide) {
		const slideItems = movieDetails
			.slice(i, i + itemsPerSlide)
			.map((movie) => <MovieCard key={movie.id} movie={movie} />);
		promotedSlides.push(<div className="slide-grid">{slideItems}</div>);
	}

	return (
		<div className="container" style={{ margin: 'auto', padding: '10px 40px' }}>
			<div className="main-banner">
				<h2>Today on cinema!</h2>
				<Slider
					autoSlide={5000}
					style={{width:"80%"}}
					elements={movieDetails.map((movie) => (
						<div
							key={movie.id}
							style={{
								aspectRatio: '16/9',
							}}>
							<img
								src={movie.largePosterImageUrl}
								alt={movie.name}
								style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
							/>
							<div>
								<div className="slide-title">
									<span>{movie.name}</span>
								</div>
								<a href={`/film/${movie.id}`} className="slide-button">
									Buy tickets
								</a>
							</div>
							
							
						</div>
					))}
				/>
			</div>
			<h3 style={{ textAlign: 'left' }}>New movies</h3>
			<div className="new-movies">
				<Slider elements={newReleasesSlides} />
			</div>
			<h3 style={{ textAlign: 'left' }}>Popular</h3>
			<div className="promoted-movies">
				<Slider elements={newReleasesSlides} />
			</div>
		</div>
	);
};

export default MainPage;
