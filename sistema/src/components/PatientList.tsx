import { Link } from "react-router-dom";
import "./PatientsList.css";

interface Patient {
  id: number;
  name: string;
  age: number;
  phone: string;
  address: string;
  notes?: string;
}

const mockPatients: Patient[] = [
  { id: 1, name: "Naiumy dos Reis", age: 22, phone: "99999-9999", address: "Rua A, 123" },
  { id: 2, name: "João Silva", age: 30, phone: "88888-8888", address: "Rua B, 456" },
];

const PatientsList = () => {
  return (
    <div className="patients-container">
      <h2>Pacientes</h2>

      <input
        className="search-bar"
        type="text"
        placeholder="Pesquisar por nome ou prontuário"
      />

      <div className="patients-list">
        {mockPatients.map((p) => (
          <Link to={`/patients/${p.id}`} className="patient-card" key={p.id}>
            <div className="avatar">{p.name[0]}</div>

            <div className="info">
              <p className="id">#{String(p.id).padStart(6, "0")}</p>
              <b>{p.name}</b>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PatientsList;
