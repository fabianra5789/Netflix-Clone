import { useState } from 'react';
import { Play, Plus, ThumbsUp, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="movie-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/movie/${movie.id}`}>
        <img 
          src={movie.poster_path || movie.backdrop_path} 
          alt={movie.title}
          className="movie-card__image"
        />
      </Link>
      
      {isHovered && (
        <div className="movie-card__overlay">
          <div className="movie-card__info">
            <div className="movie-card__buttons">
              <button className="movie-card__button movie-card__button--play">
                <Play size={16} fill="black" />
              </button>
              <button className="movie-card__button movie-card__button--add">
                <Plus size={16} />
              </button>
              <button className="movie-card__button movie-card__button--like">
                <ThumbsUp size={16} />
              </button>
              <Link to={`/movie/${movie.id}`} className="movie-card__button movie-card__button--info">
                <ChevronDown size={16} />
              </Link>
            </div>
            <h3 className="movie-card__title">{movie.title}</h3>
            <div className="movie-card__details">
              <span className="movie-card__rating">{movie.vote_average}/10</span>
              <span className="movie-card__year">{movie.release_date?.split('-')[0]}</span>
            </div>
            <p className="movie-card__overview">
              {movie.overview?.substring(0, 100)}...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieCard;