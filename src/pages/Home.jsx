import { useState, useEffect } from 'react';
import Banner from '../components/Banner';
import MovieRow from '../components/MovieRow';
import './Home.css';

const Home = () => {
  const [movies, setMovies] = useState({
    trending: [],
    action: [],
    comedy: [],
    horror: [],
    romance: [],
    documentaries: []
  });

  // Datos de ejemplo - en una app real, estos vendrían de una API
  const sampleMovies = {
    trending: [
      {
        id: 1,
        title: "The Witcher",
        overview: "Geralt de Rivia, un cazador de monstruos mutante, lucha por encontrar su lugar en un mundo donde las personas a menudo demuestran ser más malvadas que las bestias.",
        poster_path: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        backdrop_path: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        vote_average: 8.2,
        release_date: "2019-12-20"
      },
      {
        id: 2,
        title: "Ozark",
        overview: "Un asesor financiero arrastra a su familia desde Chicago hasta los Ozarks de Missouri, donde debe lavar dinero para apaciguar a un jefe de la droga.",
        poster_path: "https://images.unsplash.com/photo-1489599162163-3fb2c0812d0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        backdrop_path: "https://images.unsplash.com/photo-1489599162163-3fb2c0812d0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        vote_average: 8.4,
        release_date: "2017-07-21"
      },
      {
        id: 3,
        title: "Money Heist",
        overview: "Un criminal misterioso llamado 'El Profesor' planea el mayor atraco de la historia para imprimir miles de millones de euros en la Fábrica Nacional de Moneda.",
        poster_path: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        backdrop_path: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        vote_average: 8.3,
        release_date: "2017-05-02"
      },
      {
        id: 4,
        title: "Dark",
        overview: "Un niño desaparece en el pequeño pueblo alemán de Winden. Mientras las familias buscan respuestas, descubren una historia que abarca cuatro generaciones.",
        poster_path: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        backdrop_path: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        vote_average: 8.8,
        release_date: "2017-12-01"
      },
      {
        id: 5,
        title: "The Crown",
        overview: "Sigue la vida política y los romances de la Reina Isabel II y los eventos que dieron forma a la segunda mitad del siglo XX.",
        poster_path: "https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        backdrop_path: "https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        vote_average: 8.6,
        release_date: "2016-11-04"
      }
    ],
    action: [
      {
        id: 6,
        title: "Extraction",
        overview: "Un mercenario de operaciones encubiertas debe rescatar al hijo secuestrado de un señor del crimen internacional.",
        poster_path: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        backdrop_path: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        vote_average: 6.8,
        release_date: "2020-04-24"
      },
      {
        id: 7,
        title: "6 Underground",
        overview: "Seis individuos de diferentes partes del mundo, cada uno el mejor en lo que hace, han sido elegidos no solo por su habilidad, sino por un deseo único de borrar su pasado.",
        poster_path: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        backdrop_path: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        vote_average: 6.1,
        release_date: "2019-12-13"
      }
    ],
    comedy: [
      {
        id: 8,
        title: "The Good Place",
        overview: "Una mujer lucha por ser una mejor persona después de descubrir que accidentalmente fue enviada al 'lugar bueno' en lugar del 'lugar malo'.",
        poster_path: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        backdrop_path: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        vote_average: 8.2,
        release_date: "2016-09-19"
      }
    ],
    horror: [
      {
        id: 9,
        title: "The Haunting of Hill House",
        overview: "Hermanos adultos que crecieron en lo que eventualmente se convertiría en la casa embrujada más famosa del país, se ven obligados a regresar juntos.",
        poster_path: "https://images.unsplash.com/photo-1520637836862-4d197d17c93a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        backdrop_path: "https://images.unsplash.com/photo-1520637836862-4d197d17c93a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        vote_average: 8.6,
        release_date: "2018-10-12"
      }
    ],
    romance: [
      {
        id: 10,
        title: "Bridgerton",
        overview: "Los ocho hermanos de la familia Bridgerton buscan el amor y la felicidad en la alta sociedad londinense.",
        poster_path: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        backdrop_path: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        vote_average: 7.3,
        release_date: "2020-12-25"
      },
      {
        id: 11,
        title: "Wednesday",
        overview: "Una estudiante psíquica navega por sus años en la Academia Nevermore, intentando dominar su habilidad psíquica emergente, frustrar una monstruosa matanza que ha aterrorizado a la ciudad local y resolver el misterio de asesinato que involucró a sus padres hace 25 años.",
        poster_path: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        backdrop_path: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        vote_average: 8.1,
        release_date: "2022-11-23"
      },
      {
        id: 13,
        title: "Squid Game",
        overview: "Cientos de jugadores con problemas de dinero aceptan una invitación para competir en juegos infantiles. Dentro hay un premio tentador, con riesgos mortales.",
        poster_path: "https://images.unsplash.com/photo-1489599162163-3fb2c0812d0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        backdrop_path: "https://images.unsplash.com/photo-1489599162163-3fb2c0812d0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        vote_average: 8.0,
        release_date: "2021-09-17"
      }
    ],
    action: [
      {
        id: 14,
        title: "John Wick",
        overview: "Un ex-asesino a sueldo sale de su retiro para rastrear a los gángsters que tomaron todo de él.",
        poster_path: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        backdrop_path: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        vote_average: 7.4,
        release_date: "2014-10-24"
      },
      {
        id: 15,
        title: "Mad Max: Fury Road",
        overview: "En un mundo post-apocalíptico, Max se une con una mujer rebelde para huir de un señor de la guerra tiránico.",
        poster_path: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        backdrop_path: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        vote_average: 8.1,
        release_date: "2015-05-15"
      },
      {
        id: 16,
        title: "The Matrix",
        overview: "Un hacker descubre que la realidad tal como la conoce no existe y se une a una rebelión contra las máquinas.",
        poster_path: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        backdrop_path: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        vote_average: 8.7,
        release_date: "1999-03-31"
      }
    ],
    comedy: [
      {
        id: 17,
        title: "Brooklyn Nine-Nine",
        overview: "Comedia sobre un grupo de detectives en una comisaría de Brooklyn y su capitán recién asignado.",
        poster_path: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        backdrop_path: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        vote_average: 8.4,
        release_date: "2013-09-17"
      },
      {
        id: 18,
        title: "The Office",
        overview: "Un falso documental sobre la vida cotidiana de los empleados de oficina en Scranton, Pennsylvania.",
        poster_path: "https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        backdrop_path: "https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        vote_average: 8.5,
        release_date: "2005-03-24"
      },
      {
        id: 19,
        title: "Friends",
        overview: "Sigue las vidas personales y profesionales de seis amigos de 20 y 30 años que viven en Manhattan.",
        poster_path: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        backdrop_path: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        vote_average: 8.9,
        release_date: "1994-09-22"
      }
    ],
    horror: [
      {
        id: 20,
        title: "Stranger Things",
        overview: "Cuando un niño desaparece, su madre, un jefe de policía y sus amigos deben enfrentar fuerzas terroríficas para recuperarlo.",
        poster_path: "https://images.unsplash.com/photo-1520637836862-4d197d17c93a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        backdrop_path: "https://images.unsplash.com/photo-1520637836862-4d197d17c93a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        vote_average: 8.7,
        release_date: "2016-07-15"
      },
      {
        id: 21,
        title: "The Walking Dead",
        overview: "El sheriff Rick Grimes despierta de un coma para encontrar un mundo post-apocalíptico dominado por zombies.",
        poster_path: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        backdrop_path: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        vote_average: 8.2,
        release_date: "2010-10-31"
      },
      {
        id: 22,
        title: "American Horror Story",
        overview: "Una antología de terror que reinventa el género con cada temporada.",
        poster_path: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        backdrop_path: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        vote_average: 8.0,
        release_date: "2011-10-05"
      }
    ],
    romance: [
      {
        id: 23,
        title: "Emily in Paris",
        overview: "Una ejecutiva de marketing de Chicago se muda a París por trabajo inesperado.",
        poster_path: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        backdrop_path: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        vote_average: 6.9,
        release_date: "2020-10-02"
      },
      {
        id: 24,
        title: "The Notebook",
        overview: "Una pareja pobre pero apasionada debe enfrentar una decisión que separará sus caminos para siempre.",
        poster_path: "https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        backdrop_path: "https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        vote_average: 7.8,
        release_date: "2004-06-25"
      },
      {
        id: 25,
        title: "Pride and Prejudice",
        overview: "Chispas vuelan cuando la espirituosa Elizabeth Bennet conoce al orgulloso Sr. Darcy.",
        poster_path: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        backdrop_path: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        vote_average: 8.1,
        release_date: "2005-09-16"
      }
    ],
    documentaries: [
      {
        id: 26,
        title: "Making a Murderer",
        overview: "Documental sobre Steven Avery, un hombre de Wisconsin que sirvió 18 años en prisión por un crimen que no cometió.",
        poster_path: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        backdrop_path: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        vote_average: 8.6,
        release_date: "2015-12-18"
      },
      {
        id: 27,
        title: "Tiger King",
        overview: "Un vistazo al mundo de los grandes felinos en cautiverio y las personas excéntricas que los poseen.",
        poster_path: "https://images.unsplash.com/photo-1520637836862-4d197d17c93a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        backdrop_path: "https://images.unsplash.com/photo-1520637836862-4d197d17c93a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        vote_average: 7.5,
        release_date: "2020-03-20"
      },
      {
        id: 28,
        title: "Free Solo",
        overview: "Sigue al escalador Alex Honnold mientras se prepara para lograr su sueño de toda la vida: escalar El Capitán sin cuerdas.",
        poster_path: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        backdrop_path: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        vote_average: 8.2,
        release_date: "2018-09-28"
      }
    ]
  };

  useEffect(() => {
    // Simular carga de datos
    setMovies(sampleMovies);
  }, []);

  return (
    <div className="home">
      <Banner />
      <div className="home__content">
        <MovieRow title="Tendencias ahora" movies={movies.trending} />
        <MovieRow title="Acción y aventura" movies={movies.action} />
        <MovieRow title="Comedias" movies={movies.comedy} />
        <MovieRow title="Terror" movies={movies.horror} />
        <MovieRow title="Románticas" movies={movies.romance} />
        <MovieRow title="Documentales" movies={movies.documentaries} />
      </div>
    </div>
  );
};

export default Home;