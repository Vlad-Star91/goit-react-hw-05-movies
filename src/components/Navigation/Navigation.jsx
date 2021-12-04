import { NavLink } from 'react-router-dom';
import s from './Navigation.module.css';

export default function Navigation() {
  const active = ({ isActive }) => (isActive ? s.activeLink : s.link);
  return (
    <>
      <nav>
        <NavLink to="/" className={active}>
          Home
        </NavLink>
        <NavLink to="/movies" className={active}>
          Movies
        </NavLink>
      </nav>
    </>
  );
}
