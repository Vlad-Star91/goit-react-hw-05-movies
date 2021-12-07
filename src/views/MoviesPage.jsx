import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router';
import * as movieAPI from '../services/movieAPI';
import PageHeading from '../components/PageHeading/PageHeading';

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const getQuery = new URLSearchParams(location.search).get('query');
  const [searchQuery, setSearchQuery] = useState(getQuery ? getQuery : '');

  useEffect(() => {
    if (searchQuery.trim() === '') {
      return;
    }

    movieAPI
      .fetchSearchMovies(searchQuery)
      .then(({ results }) => {
        if (results.length === 0) {
          alert(`Not match for request ${searchQuery}`);
          return;
        }
        setMovies(results);
      })
      .catch(new Error('Error message'));
  }, [searchQuery]);

  const onInputChange = event => {
    setQuery(event.target.value);
  };

  const handleSubmitInput = event => {
    event.preventDefault();

    if (query.trim() === '') {
      alert('Please enter text');
      return;
    }

    navigate({ ...location, search: `query=${query}` });

    setSearchQuery(query);
    setQuery('');
  };

  return (
    <>
      <PageHeading text="Movies" />
      <form onSubmit={handleSubmitInput}>
        <label>
          <input
            type="text"
            autoComplete="off"
            autoFocus
            value={query}
            onChange={onInputChange}
            placeholder="Search movie..."
          ></input>
        </label>
        <button type="submit">Search</button>
      </form>

      {movies.length > 0 && (
        <ul>
          {movies.map(({ id, title }) => (
            <li key={id}>
              <NavLink to={`${id}`} state={{ from: location }}>
                {title}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
