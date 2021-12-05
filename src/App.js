import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AppBar from './components/AppBar/AppBar.jsx';
import Container from './components/Container/Container.jsx';

const HomePage = lazy(() => import('./views/HomePage.jsx'));
const MoviesPage = lazy(() => import('./views/MoviesPage.jsx'));
const MovieDetailsPage = lazy(() => import('./views/MovieDetailsPage.jsx'));

export default function App() {
  return (
    <Container>
      <AppBar />
      <Suspense fallback={<h1>ЗАГРУЖАЕМ МАРШРУТ...</h1>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId/*" element={<MovieDetailsPage />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </Suspense>
    </Container>
  );
}
