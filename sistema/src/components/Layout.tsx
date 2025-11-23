import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import "./Layout.css";

export default function Layout() {
  return (
    <div className={`layout light`}> 
      <NavBar />

      <div className="main-area">
        <header className="topbar">
          <h2>Dra. Natália Rossoni</h2>
        </header>

        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
