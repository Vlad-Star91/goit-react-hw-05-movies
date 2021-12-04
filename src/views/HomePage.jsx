import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';
import * as movieAPI from '../services/movieAPI';
import PageHeading from '../components/PageHeading/PageHeading';

export default function HomeView() {
  const [movies, setMovies] = useState([]);
  const location = useLocation();

  useEffect(() => {
    movieAPI.fetchTrendingMovies().then(({ results }) => {
      setMovies(results);
    });
  }, []);

  return (
    <>
      <PageHeading text="Trending today" />
      {movies && (
        <ul>
          {movies.map(({ id, title, name }) => (
            <li key={id}>
              <Link to={`movies/${id}`} state={{ from: location }}>
                {title ? title : name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
