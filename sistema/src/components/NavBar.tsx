import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/Navbar.css";

const NavBar = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      setDarkMode(true);
      document.body.classList.add("dark");
    }
  }, []);

  function toggleTheme() {
    const newTheme = !darkMode;

    setDarkMode(newTheme);

    if (newTheme) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }

  function openWhatsApp() {
    const phone = "5551982667703"; 
    const message = encodeURIComponent("Olá doutor, preciso de ajuda.");
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
  }

  function logout() {
    window.location.href = "/login"; 
  }

  return (
    <nav className={`sidebar ${darkMode ? "dark" : ""}`}>
      <ul>
        <li>
          <div className="logo">NR</div>
        </li>

        <li>
          <Link to="/" className="icon-btn">
            <img src="/src/assets/Patient.png" alt="Pacientes" />
          </Link>
        </li>

        <li>
          <Link to="/calendar" className="icon-btn">
            <img src="/src/assets/Calendar.png" alt="Agenda" />
          </Link>
        </li>

        <li className="spacer" />

        <li>
          <button className="icon-btn" onClick={toggleTheme}>
            <img
              src={darkMode ? "/src/assets/Moon.png" : "/src/assets/Sun.png"}
              alt="Tema"
            />
          </button>
        </li>

        <li>
          <button className="icon-btn" onClick={openWhatsApp}>
            <img src="/src/assets/Interrogation.png" alt="Ajuda" />
          </button>
        </li>

        <li>
          <button className="icon-btn-exit" onClick={logout}>
            <img src="/src/assets/Exit.png" alt="Sair" />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
