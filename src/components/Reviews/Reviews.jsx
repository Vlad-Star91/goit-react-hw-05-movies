import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import * as movieAPI from '../../services/movieAPI';

export default function Reviews() {
  const { movieId } = useParams(null);
  const [movie, setMovie] = useState([]);
  const [error, setError] = useState(null);

  const message = "We don't have any reviews for this movie.";

  useEffect(() => {
    movieAPI
      .fetchMovieReviews(movieId, '/reviews')
      .then(response => {
        setMovie(response.data.results);
      })
      .catch(error => setError(error));
  }, [movieId]);

  return (
    <div>
      {movie && (
        <ul>
          {movie.map(({ id, author, content }) => (
            <li key={id}>
              <h4>Author: {author}</h4>
              <p>{content}</p>
            </li>
          ))}
        </ul>
      )}

      {movie.length === 0 && message}
    </div>
  );
}
