import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import './Search.css';

const Search = () => {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const query = searchParams.get('q');

  // Datos de ejemplo para búsqueda
  const allMovies = [
    {
      id: 1,
      title: "The Witcher",
      overview: "Geralt de Rivia, un cazador de monstruos mutante, lucha por encontrar su lugar en un mundo donde las personas a menudo demuestran ser más malvadas que las bestias.",
      poster_path: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      vote_average: 8.2,
      release_date: "2019-12-20"
    },
    {
      id: 2,
      title: "Stranger Things",
      overview: "Cuando un niño desaparece, su madre, un jefe de policía y sus amigos deben enfrentar fuerzas terroríficas para recuperarlo.",
      poster_path: "https://images.unsplash.com/photo-1489599162163-3fb2c0812d0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      vote_average: 8.7,
      release_date: "2016-07-15"
    },
    {
      id: 3,
      title: "Dark",
      overview: "Un niño desaparece en el pequeño pueblo alemán de Winden. Mientras las familias buscan respuestas, descubren una historia que abarca cuatro generaciones.",
      poster_path: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      vote_average: 8.8,
      release_date: "2017-12-01"
    }
  ];

  useEffect(() => {
    if (query) {
      setLoading(true);
      // Simular búsqueda
      setTimeout(() => {
        const filteredResults = allMovies.filter(movie => 
          movie.title.toLowerCase().includes(query.toLowerCase()) ||
          movie.overview.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filteredResults);
        setLoading(false);
      }, 500);
    }
  }, [query]);

  if (!query) {
    return (
      <div className="search">
        <div className="search__container">
          <h1>Buscar contenido</h1>
          <p>Usa la barra de búsqueda para encontrar películas y series.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="search">
      <div className="search__container">
        <h1>Resultados para "{query}"</h1>
        
        {loading ? (
          <div className="search__loading">
            <p>Buscando...</p>
          </div>
        ) : (
          <>
            {results.length > 0 ? (
              <div className="search__results">
                {results.map(movie => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            ) : (
              <div className="search__no-results">
                <p>No se encontraron resultados para "{query}"</p>
                <p>Intenta con otros términos de búsqueda.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Search;