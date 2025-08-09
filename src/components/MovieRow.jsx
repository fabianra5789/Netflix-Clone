import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MovieCard from './MovieCard';
import './MovieRow.css';

const MovieRow = ({ title, movies }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const rowRef = useRef(null);

  const scroll = (direction) => {
    const container = rowRef.current;
    const scrollAmount = container.clientWidth * 0.8;
    
    if (direction === 'left') {
      container.scrollLeft -= scrollAmount;
      setScrollPosition(container.scrollLeft - scrollAmount);
    } else {
      container.scrollLeft += scrollAmount;
      setScrollPosition(container.scrollLeft + scrollAmount);
    }
  };

  return (
    <div className="movie-row">
      <h2 className="movie-row__title">{title}</h2>
      <div className="movie-row__container">
        <button 
          className="movie-row__arrow movie-row__arrow--left"
          onClick={() => scroll('left')}
          style={{ display: scrollPosition > 0 ? 'block' : 'none' }}
        >
          <ChevronLeft size={24} />
        </button>
        
        <div className="movie-row__movies" ref={rowRef}>
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
        
        <button 
          className="movie-row__arrow movie-row__arrow--right"
          onClick={() => scroll('right')}
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default MovieRow;