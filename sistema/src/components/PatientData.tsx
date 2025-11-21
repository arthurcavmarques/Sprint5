import React, { useState } from "react";
import { usePatients } from "../components/PatientContext";

interface Props {
  patientId: string;
  patient: any;
}

const PatientData = ({ patientId, patient }: Props) => {
  const { updatePatient } = usePatients();

  const [editing, setEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: patient.name,
    cpf: patient.cpf || "",
    birth: patient.birth || "",
    email: patient.email || "",
    phone: patient.phone || "",
    address: patient.address || "",
    notes: patient.notes || "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function saveChanges() {
    const updated = {
      ...patient,
      ...formData,
    };

    updatePatient(updated);
    setEditing(false);
  }

  return (
    <div className="dados-container">
      <h2>Dados do Paciente</h2>
      <label>
        Nome
        <input
          type="text"
          name="name"
          disabled={!editing}
          value={formData.name}
          onChange={handleChange}
        />
      </label>

      <label>
        CPF
        <input
          type="text"
          name="cpf"
          disabled={!editing}
          value={formData.cpf}
          onChange={handleChange}
        />
      </label>

      <label>
        Data de Nascimento
        <input
          type="date"
          name="birth"
          disabled={!editing}
          value={formData.birth}
          onChange={handleChange}
        />
      </label>

      <label>
        Email
        <input
          type="email"
          name="email"
          disabled={!editing}
          value={formData.email}
          onChange={handleChange}
        />
      </label>

      <label>
        Telefone
        <input
          type="text"
          name="phone"
          disabled={!editing}
          value={formData.phone}
          onChange={handleChange}
        />
      </label>

      <label>
        Endereço
        <input
          type="text"
          name="address"
          disabled={!editing}
          value={formData.address}
          onChange={handleChange}
        />
      </label>

      <div style={{ marginTop: "16px" }}>
        {!editing && (
          <button className="btn-primary" onClick={() => setEditing(true)}>
            Editar Dados
          </button>
        )}

        {editing && (
          <>
            <button className="btn-primary" onClick={saveChanges}>
              Salvar
            </button>

            <button
              className="btn-cancel"
              onClick={() => {
                setFormData({
                  name: patient.name,
                  cpf: patient.cpf || "",
                  birth: patient.birth || "",
                  email: patient.email || "",
                  phone: patient.phone || "",
                  address: patient.address || "",
                  notes: patient.notes || "",
                });
                setEditing(false);
              }}
            >
              Cancelar
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PatientData;
