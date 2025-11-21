import { Link } from "react-router-dom";
import "./Navbar.css"

const NavBar = () => {
  return (
    <nav className="sidebar">
      <ul>
        <li>
          <div className="logo">
           NR
          </div>
        </li>
        <li>
          <Link to="/" className="icon-btn"><img src="/src/assets/Patient.png" alt="" /></Link>
        </li>
        <li>
          <Link to="/calendar" className="icon-btn"><img src="/src/assets/Calendar.png" alt="" /></Link>
        </li>
    
        <li className="spacer" />

        <li>
          <button className="icon-btn">
            <img src="/src/assets/Sun.png" alt="" />
          </button>
        </li>

        <li>
          <button className="icon-btn">
            <img src="/src/assets/Interrogation.png" alt="" />
          </button>
        </li>

        <li>
          <Link to="/" className="icon-btn-exit">
            <img src="/src/assets/Exit.png" alt="" />
          </Link>
        </li>
      
      </ul>
    </nav>
  );
};

export default NavBar;