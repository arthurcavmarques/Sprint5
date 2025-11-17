import React from "react";

interface Patient {
  id: number;
  name: string;
  age: number;
}

interface PatientListProps {
  patients: Patient[];
  onSelect: (patient: Patient) => void;
}

const PatientList: React.FC<PatientListProps> = ({ patients, onSelect }) => {
  return (
    <div>
      <h2>Lista de Pacientes</h2>

      {patients.length === 0 ? (
        <p>Nenhum paciente cadastrado.</p>
      ) : (
        <ul>
          {patients.map((patient) => (
            <li key={patient.id} onClick={() => onSelect(patient)}>
              {patient.name} - {patient.age} anos
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PatientList;
