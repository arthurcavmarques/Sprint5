import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePatients } from "../components/PatientContext";
import "./PatientDetails.css";

const PatientDetailsPage: React.FC = () => {
  const { id } = useParams();
  if (!id) {
    return (
      <div className="details-empty">
        <p style={{ opacity: 0.7 }}>Selecione um paciente para ver os detalhes.</p>
      </div>
    );
  }

  const computeInitials = (fullName: string) =>
    fullName
      .split(" ")
      .filter(Boolean)
      .map((n) => n[0].toUpperCase())
      .slice(0, 2)
      .join("");

  const { patients, deletePatient } = usePatients();
  const navigate = useNavigate();

  const found = patients.find((p) => p.id === id);

  if (!found) {
    return (
      <div className="details-empty">
        <p style={{ opacity: 0.7 }}>Paciente não encontrado.</p>
      </div>
    );
  }

  const patientName = found.name;
  const patient = {
    id: found.id,
    initials: computeInitials(patientName),
    name: patientName,
    record: String(found.id),
    birth: found.birthdate || "",
    phone: found.phone || "",
    cpf: found.cpf || "",
    email: found.email || "",
    firstConsultation: found.firstConsultation || "",
    events: found.events || [],
    evolutions: found.evolutions || []
  };

  const [activeTab, setActiveTab] = useState<"dados" | "agenda" | "evolucoes">(
    "dados"
  );

  const [events, setEvents] = useState<
    { date: string; name: string; start: string; end: string }[]
  >([]);

  const upcoming = events.filter(e => new Date(e.date) >= new Date());
  const previous = events.filter(e => new Date(e.date) < new Date());

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);

  const [eventDate, setEventDate] = useState("");
  const [eventName, setEventName] = useState("");
  const [eventStart, setEventStart] = useState("");
  const [eventEnd, setEventEnd] = useState("");

  const [editingEvent, setEditingEvent] = useState<number | null>(null);
  const { updatePatient } = usePatients();

const [editingData, setEditingData] = useState(false);

const [editData, setEditData] = useState({
  id: patient.id!,
  name: patient.name || "",
  birthdate: patient.birth || "",
  phone: patient.phone || "",
  email: patient.email || "",
  cpf: patient.cpf || "",
  firstConsultation: patient.firstConsultation || "",
  events: patient.events ?? [],
  evolutions: patient.evolutions ?? []
});

function handleSaveData() {
  updatePatient(editData);
  setEditingData(false);
}


  const handleDeletePatient = () => {
    if (patient.id) {
      deletePatient(patient.id);
    }

    setShowDeleteModal(false);
    navigate("/");
  };

  const startEditEvent = (index: number) => {
    const ev = events[index];

    setEditingEvent(index);
    setEventDate(ev.date);
    setEventName(ev.name);
    setEventStart(ev.start);
    setEventEnd(ev.end);

    setShowEventModal(true);
  };

  const saveEvent = () => {
    if (editingEvent === null) return;

    const updated = [...events];
    updated[editingEvent] = {
      date: eventDate,
      name: eventName,
      start: eventStart,
      end: eventEnd
    };

    setEvents(updated);

    setEditingEvent(null);
    setShowEventModal(false);

    setEventDate("");
    setEventName("");
    setEventStart("");
    setEventEnd("");

    setActiveTab("agenda");
  };

  const [evolutions, setEvolutions] = useState<
    { title: string; date: string; time: string; description: string }[]
  >([]);

  const [showEvolutionModal, setShowEvolutionModal] = useState(false);

  const [evoTitle, setEvoTitle] = useState("");
  const [evoDate, setEvoDate] = useState("");
  const [evoTime, setEvoTime] = useState("");
  const [evoDesc, setEvoDesc] = useState("");

  const [editingEvolution, setEditingEvolution] = useState<number | null>(null);

  const startEditEvolution = (index: number) => {
    const ev = evolutions[index];

    setEditingEvolution(index);
    setEvoTitle(ev.title);
    setEvoDate(ev.date);
    setEvoTime(ev.time);
    setEvoDesc(ev.description);

    setShowEvolutionModal(true);
  };

  const saveEvolution = () => {
    if (editingEvolution === null) return;

    const updated = [...evolutions];
    updated[editingEvolution] = {
      title: evoTitle,
      date: evoDate,
      time: evoTime,
      description: evoDesc
    };

    setEvolutions(updated);

    setEditingEvolution(null);
    setShowEvolutionModal(false);

    setEvoTitle("");
    setEvoDate("");
    setEvoTime("");
    setEvoDesc("");

    setActiveTab("evolucoes");
  };

  return (
    <div className="details-container">
      <div className="details-header">
        <div className="details-left">
          <div className="details-avatar">{patient.initials}</div>
          <h2>
            {patient.name} | {patient.record}
          </h2>
        </div>

        <div className="details-actions">
          <button
            className="btn-secondary"
            onClick={() => {
              setEditingEvent(null);
              setShowEventModal(true);
            }}
          >
            Criar Evento
          </button>

          <button
            className="btn-primary"
            onClick={() => {
              setEditingEvolution(null);
              setShowEvolutionModal(true);
            }}
          >
            Criar Evolução
          </button>
        </div>
      </div>

      <div className="details-tabs">
        <p
          className={activeTab === "dados" ? "active-tab" : ""}
          onClick={() => setActiveTab("dados")}
        >
          Dados
        </p>

        <p
          className={activeTab === "agenda" ? "active-tab" : ""}
          onClick={() => setActiveTab("agenda")}
        >
          Agenda
        </p>

        <p
          className={activeTab === "evolucoes" ? "active-tab" : ""}
          onClick={() => setActiveTab("evolucoes")}
        >
          Evoluções
        </p>
      </div>

      <hr className="barra" />

      {activeTab === "dados" && (
        <>
          <h3 className="section-title">Informações do Paciente</h3>

          <button
            className="btn-primary-edit"
            style={{ marginBottom: 15 }}
            onClick={() => setEditingData(!editingData)}
          >
            {editingData ? "Cancelar Edição" : "Editar Dados"}
          </button>

          <div className="details-grid">
            <div className="info-box">
              <p><b>Nome</b></p>
              <input
                disabled={!editingData}
                value={editData.name}
                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
              />
            </div>

            <div className="info-box">
              <p><b>Prontuário</b></p>
              <input disabled value={patient.record} />
            </div>

            <div className="info-box">
              <p><b>Data de Nascimento</b></p>
              <input
                type="date"
                disabled={!editingData}
                value={editData.birthdate}
                onChange={(e) =>
                  setEditData({ ...editData, birthdate: e.target.value })
                }
              />
            </div>

            <div className="info-box">
              <p><b>Telefone</b></p>
              <input
                disabled={!editingData}
                value={editData.phone}
                onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
              />
            </div>

            <div className="info-box">
              <p><b>Email</b></p>
              <input
                disabled={!editingData}
                value={editData.email}
                onChange={(e) => setEditData({ ...editData, email: e.target.value })}
              />
            </div>

            <div className="info-box">
              <p><b>CPF</b></p>
              <input
                disabled={!editingData}
                value={editData.cpf}
                onChange={(e) => setEditData({ ...editData, cpf: e.target.value })}
              />
            </div>

            <div className="info-box">
              <p><b>Primeira Consulta</b></p>
              <input
                type="date"
                disabled={!editingData}
                value={editData.firstConsultation}
                onChange={(e) =>
                  setEditData({ ...editData, firstConsultation: e.target.value })
                }
              />
            </div>
          </div>

          {editingData && (
            <button
              className="btn-primary-edit"
              style={{ marginTop: 20 }}
              onClick={handleSaveData}
            >
              Salvar Alterações
            </button>
          )}
        </>
      )}


      {activeTab === "agenda" && (
        <div className="agenda-container">

          <h3 className="agenda-title">Próximos Atendimentos</h3>
          {upcoming.length === 0 ? (
            <p className="agenda-empty">Nenhuma consulta agendada</p>
          ) : (
            upcoming.map((ev, i) => (
              <div key={i} className="agenda-card">
                <h4>{ev.name}</h4>
                <p>{ev.date}</p>
                <p>{ev.start} - {ev.end}</p>

                <button
                  className="btn-secondary"
                  onClick={() => startEditEvent(i)}
                >
                  Editar
                </button>
              </div>
            ))
          )}

          <hr className="barra" />

          <h3 className="agenda-title">Atendimentos Anteriores</h3>
          {previous.length === 0 ? (
            <p className="agenda-empty">Nenhuma consulta realizada</p>
          ) : (
            previous.map((ev, i) => (
              <div key={i} className="agenda-card">
                <h4>{ev.name}</h4>
                <p>{ev.date}</p>
                <p>{ev.start} - {ev.end}</p>

                <button
                  className="btn-secondary"
                  onClick={() => startEditEvent(i)}
                >
                  Editar
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === "evolucoes" && (
        <div className="evo-container">
          {evolutions.length === 0 ? (
            <p style={{ marginTop: 20, opacity: 0.6 }}>
              Nenhuma evolução registrada
            </p>
          ) : (
            evolutions.map((ev, i) => (
              <div key={i} className="evo-card">
                <h4>{ev.title}</h4>
                <p><b>{ev.date}</b> às {ev.time}</p>
                <p>{ev.description}</p>

                <button
                  className="btn-secondary"
                  onClick={() => startEditEvolution(i)}
                >
                  Editar
                </button>
              </div>
            ))
          )}
        </div>
      )}

      <button
        className="delete-btn"
        onClick={() => setShowDeleteModal(true)}
      >
        Excluir Paciente
      </button>

      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Deseja mesmo deletar este Paciente?</h3>
            <p className="warning-text">Esta ação é irreversível.</p>

            <div className="modal-actions">
              <button
                className="cancel-btn"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancelar
              </button>

              <button
                className="confirm-btn"
                onClick={handleDeletePatient}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      {showEventModal && (
        <div className="modal-overlay">
          <div className="event-modal-box">

            <div className="event-modal-header">
              <h2>{editingEvent !== null ? "Editar Evento" : "Novo Evento"}</h2>
              <button className="close-btn" onClick={() => setShowEventModal(false)}>
                ✕
              </button>
            </div>

            <div className="event-modal-body">

              <div className="field">
                <label>Paciente</label>
                <select defaultValue={patient.name}>
                  <option>{patient.name}</option>
                </select>
              </div>

              <div className="field">
                <label>Data</label>
                <input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
              </div>

              <div className="field">
                <label>Nome do evento</label>
                <input type="text" placeholder="Nome do evento" value={eventName} onChange={(e) => setEventName(e.target.value)} />
              </div>

              <div className="time-row">
                <div className="field">
                  <label>Hora de início</label>
                  <input type="time" value={eventStart} onChange={(e) => setEventStart(e.target.value)} />
                </div>

                <div className="field">
                  <label>Hora de término</label>
                  <input type="time" value={eventEnd} onChange={(e) => setEventEnd(e.target.value)} />
                </div>
              </div>
            </div>

            <div className="event-modal-footer">
              <button className="btn-primary" onClick={() => {

                if (editingEvent !== null) {
                  saveEvent();
                  return;
                }

                if (!eventDate || !eventName) {
                  alert("Preencha a data e o nome do evento.");
                  return;
                }

                const newEvent = {
                  date: eventDate,
                  name: eventName,
                  start: eventStart,
                  end: eventEnd
                };

                setEvents((prev) => [...prev, newEvent]);
                setShowEventModal(false);

                setEventDate("");
                setEventName("");
                setEventStart("");
                setEventEnd("");

                setActiveTab("agenda");
              }}
            >
              {editingEvent !== null ? "Salvar Alterações" : "Criar Evento"}
            </button>

            </div>
          </div>
        </div>
      )}

      {showEvolutionModal && (
        <div className="modal-overlay">
          <div className="event-modal-box" style={{ maxWidth: "900px" }}>

            <div className="event-modal-header">
              <h2>{editingEvolution !== null ? "Editar Evolução" : "Nova Evolução"}</h2>
              <button className="close-btn" onClick={() => setShowEvolutionModal(false)}>
                ✕
              </button>
            </div>

            <div className="event-modal-body">

              <div className="field">
                <label>Título</label>
                <input type="text" value={evoTitle} onChange={(e) => setEvoTitle(e.target.value)} />
              </div>

              <div className="field">
                <label>Data</label>
                <input type="date" value={evoDate} onChange={(e) => setEvoDate(e.target.value)} />
              </div>

              <div className="field">
                <label>Hora</label>
                <input type="time" value={evoTime} onChange={(e) => setEvoTime(e.target.value)} />
              </div>

              <div className="field">
                <label>Descrição</label>
                <textarea
                  rows={6}
                  placeholder="Descreva o que aconteceu"
                  value={evoDesc}
                  onChange={(e) => setEvoDesc(e.target.value)}
                ></textarea>
              </div>

            </div>

            <div className="event-modal-footer">
              <button
                className="btn-primary"
                onClick={() => {
                  if (editingEvolution !== null) {
                    saveEvolution();
                    return;
                  }

                  if (!evoTitle || !evoDate) {
                    alert("Preencha título e data.");
                    return;
                  }

                  const newEvolution = {
                    title: evoTitle,
                    date: evoDate,
                    time: evoTime,
                    description: evoDesc
                  };

                  setEvolutions(prev => [...prev, newEvolution]);

                  setShowEvolutionModal(false);

                  setEvoTitle("");
                  setEvoDate("");
                  setEvoTime("");
                  setEvoDesc("");

                  setActiveTab("evolucoes");
                }}
              >
                {editingEvolution !== null ? "Salvar Alterações" : "Publicar"}
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default PatientDetailsPage;