import React, { createContext, useContext, useState } from "react";
import "./Form.css"

export interface Patient {
  id: string;
  name: string;
  birthdate: string;
  phone: string;
  email: string;
  cpf: string;
}

interface PatientContextType {
  patients: Patient[];
  addPatient: (patient: Patient) => void;
  deletePatient: (id: string) => void;      
  updatePatient: (patient: Patient) => void; 
}

const PatientContext = createContext<PatientContextType>({
  patients: [],
  addPatient: () => {},
  deletePatient: () => {},
  updatePatient: () => {},
});

export const PatientProvider = ({ children }: { children: React.ReactNode }) => {
  const [patients, setPatients] = useState<Patient[]>([]);

  function addPatient(patient: Patient) {
    setPatients((prev) => [...prev, patient]);
  }

  function deletePatient(id: string) {
    setPatients((prev) => prev.filter((p) => p.id !== id));
  }

  function updatePatient(updated: Patient) {
    setPatients((prev) =>
      prev.map((p) => (p.id === updated.id ? updated : p))
    );
  }

  return (
    <PatientContext.Provider
      value={{ patients, addPatient, deletePatient, updatePatient }}
    >
      {children}
    </PatientContext.Provider>
  );
};

export function usePatients() {
  return useContext(PatientContext);
}
