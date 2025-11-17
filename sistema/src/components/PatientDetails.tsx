import React from "react";

interface Patient {
  id: number;
  name: string;
  age: number;
  phone: string;
  address: string;
  notes?: string;
}

interface PatientDetailsProps {
  patient: Patient | null;
}

const PatientDetails: React.FC<PatientDetailsProps> = ({ patient }) => {
  if (!patient) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>Detalhes do Paciente</h2>
        <p>Nenhum paciente selecionado.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Detalhes do Paciente</h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          maxWidth: "400px",
        }}
      >
        <p>
          <strong>Nome:</strong> {patient.name}
        </p>

        <p>
          <strong>Idade:</strong> {patient.age}
        </p>

        <p>
          <strong>Telefone:</strong> {patient.phone}
        </p>

        <p>
          <strong>Endereço:</strong> {patient.address}
        </p>

        {patient.notes && (
          <p>
            <strong>Observações:</strong> {patient.notes}
          </p>
        )}
      </div>
    </div>
  );
};

export default PatientDetails;
