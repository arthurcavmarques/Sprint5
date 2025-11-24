import React, { useState } from "react";
import { usePatients } from "./PatientContext";
import "../styles/Modal.css";

interface Props {
  visible: boolean;
  initialDate?: string;
  onClose: () => void;
  onSave: (ev: { id?: string; title: string; date: string; patientId?: string }) => void;
}

const CreateConsultationModal = ({ visible, initialDate, onClose, onSave }: Props) => {
  const { patients } = usePatients();
  const [patientId, setPatientId] = useState<string>(patients[0]?.id ?? "");
  const [title, setTitle] = useState<string>(patients[0]?.name ?? "");
  const [date, setDate] = useState<string>(initialDate ?? "");

  React.useEffect(() => {
    setDate(initialDate ?? "");
    setPatientId(patients[0]?.id ?? "");
    setTitle(patients[0]?.name ?? "");
  }, [initialDate, patients]);

  if (!visible) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Criar consulta</h3>

        <div style={{ display: "grid", gap: 8 }}>
          <label>
            Paciente
            <select value={patientId} onChange={(e) => {
              setPatientId(e.target.value);
              const p = patients.find((x) => x.id === e.target.value);
              if (p) setTitle(p.name);
            }}>
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
            <button className="danger"  onClick={onClose}>Cancelar</button>
            <button className="primary" type="button" onClick={() => {
              if (!date) return alert("Informe a data");
              onSave({ title, date, patientId });
            }}>Criar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateConsultationModal;
