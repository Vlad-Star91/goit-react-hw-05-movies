import { useState, useEffect } from 'react';
import * as movieAPI from '../services/movieAPI';
import PageHeading from '../components/PageHeading/PageHeading';
import MovieList from '../components/MovieList/MovieList';

export default function HomeView() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    movieAPI
      .fetchTrendingMovies()
      .then(({ results }) => {
        setMovies(results);
      })
      .catch(new Error('Error message'));
  }, []);

  return (
    <>
      <PageHeading text="Trending today" />
      {movies && <MovieList movies={movies} />}
    </>
  );
}
