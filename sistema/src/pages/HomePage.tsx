import { Link } from "react-router-dom";
import { usePatients } from "../components/PatientContext"; 
import "./Home.css";

const HomePage = () => {

  const { patients } = usePatients();

  return (
    <div className="home-container">

      <div className="top-row">

        <h2>Pacientes</h2>

        <input
          type="text"
          className="search-input"
          placeholder="Pesquisar por nome ou prontuário"
        />

        <Link to="/novo-paciente" className="add-btn">
          <img src="/src/assets/PatientAdd.png" alt="" />
          <span>Novo Paciente</span>
        </Link>

      </div>

      <div className="patient-list">
        {patients.map((p) => (
          <Link key={p.id} to={`/patients/${p.id}`} className="patient-card">
            <div className="patient-top">
              <div className="avatar">
                {p.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
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
              <button className="btn-home">
                <img src="/src/assets/Email.png" alt="" />
                Copiar Email
              </button>
              <button className="btn-home">
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
