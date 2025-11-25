import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePatients } from "../components/PatientContext";
import "../styles/PatientDetails.css";

const API = "http://localhost:3001/patients";

const PatientDetailsPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    deletePatient,
    updatePatient,
    addEvent,
    addEvolution,
  } = usePatients();

  const [patient, setPatient] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const [newEvent, setNewEvent] = useState("");
  const [newEvolution, setNewEvolution] = useState("");

  // Busca do backend
  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const res = await fetch(`${API}/${id}`);
        if (!res.ok) throw new Error("Erro ao carregar paciente");
        const data = await res.json();
        setPatient(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (!patient) return <p>Paciente não encontrado.</p>;

  // Atualizar informações básicas do paciente
  const handleUpdate = async () => {
    const body = {
      name: patient.name,
      phone: patient.phone,
      email: patient.email,
      birthdate: patient.birthdate,
      cpf: patient.cpf,
    };

    try {
      const res = await fetch(`${API}/${patient.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Erro ao atualizar");

      const updated = await res.json();

      setPatient(updated);
      updatePatient(patient.id, updated);

      alert("Dados atualizados!");
    } catch (err) {
      console.error(err);
      alert("Erro ao atualizar paciente.");
    }
  };

  const handleAddEvent = async () => {
    if (!newEvent.trim()) return;

    try {
      const res = await fetch(`${API}/${patient.id}/events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: newEvent }),
      });

      if (!res.ok) throw new Error("Erro ao adicionar evento");

      const saved = await res.json();
      addEvent(patient.id, saved);

      setPatient((prev: any) => ({
        ...prev,
        events: [...prev.events, saved],
      }));

      setNewEvent("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddEvolution = async () => {
    if (!newEvolution.trim()) return;

    try {
      const res = await fetch(`${API}/${patient.id}/evolutions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: newEvolution }),
      });

      if (!res.ok) throw new Error("Erro ao adicionar evolução");

      const saved = await res.json();
      addEvolution(patient.id, saved);

      setPatient((prev: any) => ({
        ...prev,
        evolutions: [...prev.evolutions, saved],
      }));

      setNewEvolution("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    const ok = confirm("Tem certeza que deseja excluir?");
    if (!ok) return;

    try {
      const res = await fetch(`${API}/${patient.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erro ao excluir");

      deletePatient(patient.id);
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Erro ao excluir paciente.");
    }
  };

  return (
    <div className="patient-details-container">
      <h1>Detalhes do Paciente</h1>

      <div className="patient-box">
        <label>Nome:</label>
        <input
          value={patient.name}
          onChange={(e) => setPatient({ ...patient, name: e.target.value })}
        />

        <label>Telefone:</label>
        <input
          value={patient.phone}
          onChange={(e) => setPatient({ ...patient, phone: e.target.value })}
        />

        <label>E-mail:</label>
        <input
          value={patient.email}
          onChange={(e) => setPatient({ ...patient, email: e.target.value })}
        />

        <label>Data de nascimento:</label>
        <input
          type="date"
          value={patient.birthdate}
          onChange={(e) => setPatient({ ...patient, birthdate: e.target.value })}
        />

        <label>CPF:</label>
        <input
          value={patient.cpf}
          onChange={(e) => setPatient({ ...patient, cpf: e.target.value })}
        />

        <button className="save-btn" onClick={handleUpdate}>
          Salvar alterações
        </button>
      </div>

      <hr />

      {/* EVENTOS */}
      <h2>Eventos</h2>
      <div className="event-box">
        {patient.events?.map((ev: any) => (
          <div key={ev.id} className="event-item">
            <p>{ev.text}</p>
          </div>
        ))}

        <textarea
          value={newEvent}
          placeholder="Adicionar evento..."
          onChange={(e) => setNewEvent(e.target.value)}
        />
        <button onClick={handleAddEvent}>Adicionar Evento</button>
      </div>

      <hr />

      {/* EVOLUÇÕES */}
      <h2>Evoluções</h2>
      <div className="evolution-box">
        {patient.evolutions?.map((ev: any) => (
          <div key={ev.id} className="evolution-item">
            <p>{ev.text}</p>
          </div>
        ))}

        <textarea
          value={newEvolution}
          placeholder="Adicionar evolução..."
          onChange={(e) => setNewEvolution(e.target.value)}
        />
        <button onClick={handleAddEvolution}>Adicionar Evolução</button>
      </div>

      <button className="delete-btn" onClick={handleDelete}>
        Excluir Paciente
      </button>
    </div>
  );
};

export default PatientDetailsPage;
