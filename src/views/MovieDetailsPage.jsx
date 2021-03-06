import { useState, useEffect, Suspense, lazy } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
  useParams,
  useNavigate,
  useLocation,
  Routes,
  Route,
} from 'react-router';
import * as movieAPI from '../services/movieAPI';

const Cast = lazy(() => import('../components/Cast/Cast'));
const Reviews = lazy(() => import('../components/Reviews/Reviews'));

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState();
  let releaseYear = null;

  useEffect(() => {
    movieAPI
      .fetchMovieById(movieId)
      .then(data => {
        const movies = data;
        setMovie(movies);
      })
      .catch(new Error('Error message'));
  }, [movieId]);

  if (movie) {
    releaseYear = movie.release_date.slice(0, 4);
  }
  const navigate = useNavigate();
  const location = useLocation();

  const onGoBackClick = () => {
    location.state ? navigate(location.state.from) : navigate('/');
  };

  return (
    <>
      {movie && (
        <>
          <button type="button" onClick={onGoBackClick}>
            Go Back
          </button>
          <div
            style={{
              display: 'flex',
            }}
          >
            <img
              src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
              alt={movie.title}
            />
            <div style={{ marginLeft: '20px' }}>
              <h2>
                {movie.title} ({releaseYear})
              </h2>
              <p>User Score: {movie.vote_average * 10}%</p>
              <h3>Overview</h3>
              <p>{movie.overview}</p>
              <h3>Genres</h3>
              <ul style={{ display: 'flex', listStyle: 'none', padding: 0 }}>
                {movie.genres.map(({ id, name }) => {
                  return (
                    <li
                      style={{
                        marginRight: '10px',
                      }}
                      key={id}
                    >
                      [{name}]
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <hr />
          <p>Additional information</p>
          <ul>
            <li>
              <NavLink to="cast" state={location.state}>
                Cast
              </NavLink>
            </li>
            <li>
              <NavLink to="reviews" state={location.state}>
                Reviews
              </NavLink>
            </li>
          </ul>
          <hr />
          <Outlet />
        </>
      )}

      <Suspense fallback={<h1>?????????????????? ????????????????????...</h1>}>
        <Routes>
          <Route path="/cast" element={<Cast />} />
          <Route path="/reviews" element={<Reviews />} />
        </Routes>
      </Suspense>
    </>
  );
}
