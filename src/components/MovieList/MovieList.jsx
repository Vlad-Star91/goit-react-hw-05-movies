import { useLocation } from 'react-router';
import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../Container/Container';
import PropTypes from 'prop-types';

export default function MovieList({ movies }) {
  const location = useLocation();
  return (
    <Container>
      {movies.map(movie => {
        return (
          <li key={movie.id}>
            <Link to={`movies/${movie.id}`} state={{ from: location }}>
              {movie.title}
            </Link>
          </li>
        );
      })}
    </Container>
  );
}
MovieList.propTypes = {
  movies: PropTypes.array.isRequired,
};
