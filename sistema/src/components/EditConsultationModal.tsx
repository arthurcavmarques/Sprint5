import { useState, useEffect } from "react";
import "../styles/Modal.css";

interface Ev {
  id: string;
  title: string;
  date: string;
  patientId?: string;
}

interface Props {
  visible: boolean;
  event: Ev | null;
  onClose: () => void;
  onSave: (ev: Ev) => void;
  onDelete: (id: string) => void;
}

const EditConsultationModal = ({
  visible,
  event,
  onClose,
  onSave,
  onDelete
}: Props) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setDate(event.date);
    }
  }, [event]);

  if (!visible || !event) return null;

  return (
    <>
      <div className="modal-overlay">
        <div className="modal">
          <h3>Editar consulta</h3>

          <label>
            Título
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
          </label>

          <label>
            Data
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>

          <div className="actions">
            <button className="danger" onClick={() => setConfirming(true)}>
              Excluir
            </button>
            <button
              className="primary"
              onClick={() => {
                onSave({ ...event, title, date });
                onClose();
              }}
            >
              Salvar
            </button>
          </div>
        </div>
      </div>

      {confirming && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Confirmar exclusão?</h3>
            <p className="warning-text">Essa ação é irreversível.</p>

            <div className="actions">
              <button className="danger" onClick={() => setConfirming(false)}>
                Cancelar
              </button>

              <button
                className="primary"
                onClick={() => {
                  onDelete(event.id);
                  setConfirming(false);
                  onClose();
                }}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditConsultationModal;
