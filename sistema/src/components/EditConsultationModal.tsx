import { useState, useEffect } from "react";
import { usePatients } from "./PatientContext";
import "./Modal.css";

interface Ev {
  id: string;
  title: string;
  date: string;
  patientId?: string;
}

interface Props {
  visible: boolean;
  event?: Ev | null;
  onClose: () => void;
  onSave: (ev: Ev) => void;
  onDelete: (id: string) => void;
}

const EditConsultationModal = ({ visible, event, onSave, onDelete, onClose }: Props) => {
  const { patients } = usePatients();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [patientId, setPatientId] = useState("");
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setDate(event.date);
      setPatientId(event.patientId ?? "");
    }
  }, [event]);

  if (!visible || !event) return null;

  return (
    <>
      <div className="modal-overlay">
        <div className="modal">
          <h3>Editar consulta</h3>

          <div style={{ display: "grid", gap: 8 }}>
          <label>
            Paciente
            <select value={patientId} onChange={(e) => setPatientId(e.target.value)}>
              <option value="">Selecione</option>
              {patients.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </label>

          <label>
            Título
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
          </label>

          <label>
            Data
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </label>

            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
              <button className="danger" onClick={() => setConfirming(true)}>Excluir</button>
              <button className="primary" type="button" onClick={() => { onSave({ id: event!.id, title, date, patientId }); if (onClose) onClose(); }}>Salvar</button>
            </div>
          </div>
        </div>
      </div>

      {confirming && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Confirmar exclusão</h3>
            <p>Tem certeza que deseja excluir esta consulta?</p>
            <div className="actions" style={{ marginTop: 12 }}>
              <button className="danger" onClick={() => setConfirming(false)}>Cancelar</button>
              <button className="primary" onClick={() => { onDelete(event!.id); setConfirming(false); if (onClose) onClose(); }}>Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditConsultationModal;
