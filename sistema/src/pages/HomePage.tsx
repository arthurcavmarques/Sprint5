import { Link } from "react-router-dom";
import { useState } from "react";
import { usePatients } from "../components/PatientContext";
import "./Home.css";

const HomePage = () => {
  const { patients } = usePatients();
  const [search, setSearch] = useState("");

  const filteredPatients = patients.filter((p) => {
    const s = search.toLowerCase();
    return (
      p.name.toLowerCase().includes(s) ||
      p.id.toLowerCase().includes(s)
    );
  });

  function getInitials(name: string) {
    const parts = name.trim().split(" ");
    if (parts.length === 1) {
      return parts[0][0].toUpperCase();
    }
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  function copyEmail(email: string) {
    navigator.clipboard.writeText(email);
    alert("Email copiado!");
  }

  function openWhatsApp(phone: string) {
    const number = phone.replace(/\D/g, "");
    window.open(`https://wa.me/${number}`, "_blank");
  }

  return (
    <div className="home-container">
      <div className="top-row">
        <h2>Pacientes</h2>

        <input
          type="text"
          className="search-input"
          placeholder="Pesquisar por nome ou prontuário"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Link to="/novo-paciente" className="add-btn">
          <img src="/src/assets/PatientAdd.png" alt="" />
          <span>Novo Paciente</span>
        </Link>
      </div>

      <div className="patient-list">
        {filteredPatients.map((p) => (
          <Link key={p.id} to={`/patients/${p.id}`} className="patient-card">
            <div className="patient-top">
              <div className="avatar">
                {getInitials(p.name)}
              </div>

              <div className="patient-info">
                <p>{p.id}</p>
                <b>{p.name}</b>
              </div>
            </div>

            <hr className="barra-home" />
            <p><b>Recorrência:</b> Nenhuma recorrência registrada</p>

            <hr className="barra-home" />
            <p><b>Última Consulta:</b> Nenhuma consulta registrada</p>

            <hr className="barra-home" />
            <p><b>Próxima Consulta:</b> Nenhuma consulta agendada</p>

            <hr className="barra-home" />

            <div className="btn-h">

              <button
                className="btn-home"
                onClick={(e) => {
                  e.preventDefault();
                  copyEmail(p.email);
                }}
              >
                <img src="/src/assets/Email.png" alt="" />
                Copiar Email
              </button>

              <button
                className="btn-home"
                onClick={(e) => {
                  e.preventDefault();
                  openWhatsApp(p.phone);
                }}
              >
                <img src="/src/assets/Whatsapp.png" alt="" />
                WhatsApp
              </button>

            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;