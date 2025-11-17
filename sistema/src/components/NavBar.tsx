import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Início</Link>
        </li>
        <li>
          <Link to="/patients">Pacientes</Link>
        </li>
        <li>
          <Link to="/consultations">Consultas</Link>
        </li>
        <li>
          <Link to="/calendar">Calendário</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;