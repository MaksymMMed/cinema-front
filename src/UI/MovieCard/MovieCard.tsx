import React from 'react';
import { MovieReadDto } from '../../DTOs/Movie/MovieReadDto';
import { Link } from 'react-router-dom';

interface CommentProps {
	movie: MovieReadDto;
	style?: React.CSSProperties;
}

const MovieCard: React.FC<CommentProps> = ({ movie, style }) => {
	return (
		<Link
			to={`/film/${movie.id}`}
			style={{
				textDecoration: 'none',
				backgroundColor: '#dbdbdb',
				padding: '10px',
				// border: '2px solid gray',
				...style,
			}}>
			<img src={movie.imageUrl} alt="img" />
			<p>{movie.name}</p>
		</Link>
	);
};
export default MovieCard;
