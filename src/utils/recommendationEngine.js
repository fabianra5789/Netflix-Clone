class RecommendationEngine {
  constructor() {
    this.userPreferences = new Map();
    this.movieGenres = new Map();
    this.viewingHistory = new Map();
  }

  // Analizar preferencias del usuario basado en su historial
  analyzeUserPreferences(userId, watchHistory) {
    const genreScores = {};
    const actorScores = {};
    const directorScores = {};
    
    watchHistory.forEach(item => {
      const weight = this.calculateWeight(item.watchTime, item.duration, item.rating);
      
      // Analizar géneros
      item.genres?.forEach(genre => {
        genreScores[genre] = (genreScores[genre] || 0) + weight;
      });
      
      // Analizar actores
      item.cast?.forEach(actor => {
        actorScores[actor] = (actorScores[actor] || 0) + weight;
      });
      
      // Analizar directores
      if (item.director) {
        directorScores[item.director] = (directorScores[item.director] || 0) + weight;
      }
    });
    
    this.userPreferences.set(userId, {
      genres: genreScores,
      actors: actorScores,
      directors: directorScores,
      lastUpdated: Date.now()
    });
  }

  // Calcular peso basado en tiempo de visualización y rating
  calculateWeight(watchTime, duration, userRating) {
    const completionRate = watchTime / duration;
    const ratingWeight = userRating ? userRating / 10 : 0.5;
    
    // Más peso si vio más del 70% y le gustó
    if (completionRate > 0.7) {
      return 1.0 + ratingWeight;
    } else if (completionRate > 0.3) {
      return 0.5 + ratingWeight;
    } else {
      return 0.1;
    }
  }

  // Generar recomendaciones personalizadas
  generateRecommendations(userId, availableMovies, count = 20) {
    const preferences = this.userPreferences.get(userId);
    if (!preferences) {
      return this.getFallbackRecommendations(availableMovies, count);
    }

    const scoredMovies = availableMovies.map(movie => ({
      ...movie,
      score: this.calculateMovieScore(movie, preferences)
    }));

    return scoredMovies
      .sort((a, b) => b.score - a.score)
      .slice(0, count);
  }

  // Calcular puntuación de película basada en preferencias
  calculateMovieScore(movie, preferences) {
    let score = 0;
    
    // Puntuación por géneros
    movie.genres?.forEach(genre => {
      score += (preferences.genres[genre] || 0) * 0.4;
    });
    
    // Puntuación por actores
    movie.cast?.forEach(actor => {
      score += (preferences.actors[actor] || 0) * 0.3;
    });
    
    // Puntuación por director
    if (movie.director && preferences.directors[movie.director]) {
      score += preferences.directors[movie.director] * 0.2;
    }
    
    // Bonus por rating alto
    score += (movie.vote_average / 10) * 0.1;
    
    return score;
  }

  // Recomendaciones por defecto para usuarios nuevos
  getFallbackRecommendations(movies, count) {
    return movies
      .sort((a, b) => b.vote_average - a.vote_average)
      .slice(0, count);
  }

  // Recomendaciones basadas en contenido similar
  getSimilarContent(movieId, allMovies, count = 10) {
    const targetMovie = allMovies.find(m => m.id === movieId);
    if (!targetMovie) return [];

    const similarities = allMovies
      .filter(movie => movie.id !== movieId)
      .map(movie => ({
        ...movie,
        similarity: this.calculateSimilarity(targetMovie, movie)
      }))
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, count);

    return similarities;
  }

  // Calcular similitud entre dos películas
  calculateSimilarity(movie1, movie2) {
    let similarity = 0;
    
    // Similitud por géneros
    const commonGenres = movie1.genres?.filter(g => movie2.genres?.includes(g)) || [];
    similarity += (commonGenres.length / Math.max(movie1.genres?.length || 1, movie2.genres?.length || 1)) * 0.4;
    
    // Similitud por cast
    const commonCast = movie1.cast?.filter(c => movie2.cast?.includes(c)) || [];
    similarity += (commonCast.length / Math.max(movie1.cast?.length || 1, movie2.cast?.length || 1)) * 0.3;
    
    // Similitud por director
    if (movie1.director === movie2.director) {
      similarity += 0.2;
    }
    
    // Similitud por rating
    const ratingDiff = Math.abs(movie1.vote_average - movie2.vote_average);
    similarity += (1 - ratingDiff / 10) * 0.1;
    
    return similarity;
  }

  // Trending basado en actividad reciente
  getTrendingContent(viewingData, timeWindow = 7) {
    const cutoffDate = Date.now() - (timeWindow * 24 * 60 * 60 * 1000);
    const recentViews = viewingData.filter(view => view.timestamp > cutoffDate);
    
    const popularity = {};
    recentViews.forEach(view => {
      popularity[view.movieId] = (popularity[view.movieId] || 0) + 1;
    });
    
    return Object.entries(popularity)
      .sort(([,a], [,b]) => b - a)
      .map(([movieId]) => parseInt(movieId));
  }
}

export default RecommendationEngine;