import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, Info, Volume2, VolumeX, Plus, ThumbsUp } from 'lucide-react';
import './Banner.css';

const Banner = () => {
  const [movie, setMovie] = useState(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const featuredMovie = {
    id: 1,
    title: "Stranger Things",
    tagline: "La aventura continúa en Hawkins",
    overview: "Cuando un niño desaparece, su madre, un jefe de policía y sus amigos deben enfrentar fuerzas terroríficas para recuperarlo. En el proceso, descubren un extraordinario misterio que involucra experimentos gubernamentales secretos, fuerzas sobrenaturales aterradoras y una niña muy extraña.",
    backdrop_path: "https://images.unsplash.com/photo-1489599162163-3fb2c0812d0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    logo_path: "https://images.unsplash.com/photo-1489599162163-3fb2c0812d0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    vote_average: 8.7,
    release_date: "2016",
    genres: ["Ciencia ficción", "Drama", "Terror"],
    maturity_rating: "16+",
    duration: "4 temporadas"
  };

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setMovie(featuredMovie);
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <div className="banner banner--loading">
        <div className="banner__skeleton">
          <div className="skeleton skeleton--title"></div>
          <div className="skeleton skeleton--text"></div>
          <div className="skeleton skeleton--text"></div>
          <div className="skeleton skeleton--buttons"></div>
        </div>
      </div>
    );
  }

  if (!movie) return null;

  return (
    <div className="banner">
      {/* Background Video/Image */}
      <div 
        className="banner__background"
        style={{
          backgroundImage: `url(${movie.backdrop_path})`
        }}
      >
        <div className="banner__overlay"></div>
      </div>
      
      {/* Content */}
      <div className="banner__content">
        <div className="banner__info">
          {/* Netflix Original Badge */}
          <div className="banner__badge">
            <span className="netflix-original">SERIE ORIGINAL DE NETFLIX</span>
          </div>
          
          {/* Title */}
          <h1 className="banner__title">
            {movie.title}
            <div className="title-glow"></div>
          </h1>
          
          {/* Tagline */}
          {movie.tagline && (
            <p className="banner__tagline">{movie.tagline}</p>
          )}
          
          {/* Meta Info */}
          <div className="banner__meta">
            <span className="meta-item rating">{movie.vote_average}/10</span>
            <span className="meta-item year">{movie.release_date}</span>
            <span className="meta-item maturity">{movie.maturity_rating}</span>
            <span className="meta-item duration">{movie.duration}</span>
          </div>
          
          {/* Genres */}
          <div className="banner__genres">
            {movie.genres.map((genre, index) => (
              <span key={index} className="genre-tag">{genre}</span>
            ))}
          </div>
          
          {/* Overview */}
          <p className="banner__overview">{movie.overview}</p>
          
          {/* Action Buttons */}
          <div className="banner__actions">
            <button className="btn btn-primary banner__play">
              <Play size={20} fill="black" />
              <span>Reproducir</span>
            </button>
            
            <Link to={`/movie/${movie.id}`} className="btn btn-secondary banner__info">
              <Info size={20} />
              <span>Más información</span>
            </Link>
            
            <div className="banner__secondary-actions">
              <button className="action-btn" title="Agregar a mi lista">
                <Plus size={20} />
              </button>
              
              <button className="action-btn" title="Me gusta">
                <ThumbsUp size={20} />
              </button>
              
              <button 
                className="action-btn"
                onClick={() => setIsMuted(!isMuted)}
                title={isMuted ? 'Activar sonido' : 'Silenciar'}
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Age Rating */}
        <div className="banner__age-rating">
          <span className="age-rating">{movie.maturity_rating}</span>
        </div>
      </div>
      
      {/* Gradient Fade */}
      <div className="banner__fade"></div>
    </div>
  );
};

export default Banner;