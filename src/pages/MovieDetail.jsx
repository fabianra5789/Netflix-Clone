import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Play, Plus, ThumbsUp, ArrowLeft } from 'lucide-react';
import './MovieDetail.css';

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  // Datos de ejemplo
  const movieData = {
    1: {
      id: 1,
      title: "The Witcher",
      overview: "Geralt de Rivia, un cazador de monstruos mutante, lucha por encontrar su lugar en un mundo donde las personas a menudo demuestran ser más malvadas que las bestias. Destinado a encontrarse, Geralt y la princesa Ciri están unidos por el destino. Mientras el continente se tambalea al borde de la guerra, Geralt toma el destino en sus propias manos.",
      backdrop_path: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      poster_path: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      vote_average: 8.2,
      release_date: "2019-12-20",
      runtime: 60,
      genres: ["Fantasía", "Drama", "Acción"],
      cast: ["Henry Cavill", "Anya Chalotra", "Freya Allan"],
      director: "Lauren Schmidt Hissrich",
      seasons: 3
    },
    2: {
      id: 2,
      title: "Stranger Things",
      overview: "Cuando un niño desaparece, su madre, un jefe de policía y sus amigos deben enfrentar fuerzas terroríficas para recuperarlo. En el proceso, descubren un extraordinario misterio que involucra experimentos gubernamentales secretos, fuerzas sobrenaturales aterradoras y una niña muy extraña.",
      backdrop_path: "https://images.unsplash.com/photo-1489599162163-3fb2c0812d0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      poster_path: "https://images.unsplash.com/photo-1489599162163-3fb2c0812d0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      vote_average: 8.7,
      release_date: "2016-07-15",
      runtime: 50,
      genres: ["Ciencia ficción", "Drama", "Terror"],
      cast: ["Millie Bobby Brown", "Finn Wolfhard", "David Harbour"],
      director: "The Duffer Brothers",
      seasons: 4
    }
  };

  useEffect(() => {
    setLoading(true);
    // Simular carga de datos
    setTimeout(() => {
      setMovie(movieData[id] || null);
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <div className="movie-detail">
        <div className="movie-detail__loading">
          <p>Cargando...</p>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="movie-detail">
        <div className="movie-detail__not-found">
          <h1>Película no encontrada</h1>
          <Link to="/" className="back-link">
            <ArrowLeft size={20} />
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="movie-detail">
      <div 
        className="movie-detail__hero"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.8)), url(${movie.backdrop_path})`
        }}
      >
        <div className="movie-detail__content">
          <Link to="/" className="back-button">
            <ArrowLeft size={24} />
          </Link>
          
          <div className="movie-detail__info">
            <h1 className="movie-detail__title">{movie.title}</h1>
            
            <div className="movie-detail__meta">
              <span className="rating">{movie.vote_average}/10</span>
              <span className="year">{movie.release_date?.split('-')[0]}</span>
              <span className="runtime">{movie.runtime} min</span>
              {movie.seasons && <span className="seasons">{movie.seasons} temporadas</span>}
            </div>
            
            <div className="movie-detail__genres">
              {movie.genres?.map((genre, index) => (
                <span key={index} className="genre">{genre}</span>
              ))}
            </div>
            
            <p className="movie-detail__overview">{movie.overview}</p>
            
            <div className="movie-detail__buttons">
              <button className="detail-button detail-button--play">
                <Play size={20} fill="black" />
                Reproducir
              </button>
              <button className="detail-button detail-button--add">
                <Plus size={20} />
                Mi lista
              </button>
              <button className="detail-button detail-button--like">
                <ThumbsUp size={20} />
                Me gusta
              </button>
            </div>
            
            <div className="movie-detail__credits">
              <div className="credit-item">
                <span className="credit-label">Director:</span>
                <span className="credit-value">{movie.director}</span>
              </div>
              <div className="credit-item">
                <span className="credit-label">Reparto:</span>
                <span className="credit-value">{movie.cast?.join(', ')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;