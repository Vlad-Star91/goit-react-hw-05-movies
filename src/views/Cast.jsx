import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import * as movieAPI from '../services/movieAPI';

export default function Cast() {
  const { movieId } = useParams(null);
  const [cast, setCast] = useState();

  useEffect(() => {
    movieAPI.fetchMovieCredits(movieId).then(({ cast }) => {
      setCast(cast);
    });
  }, [movieId]);
  const imgurl = 'https://image.tmdb.org/t/p/w300';
  return (
    <>
      {cast && (
        <ul>
          {cast.map(({ id, name, character, profile_path }) => (
            <li key={id}>
              {profile_path && (
                <img width="100" src={`${imgurl}${profile_path}`} alt={name} />
              )}
              <p>{name}</p>
              <p>Character: {character}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
