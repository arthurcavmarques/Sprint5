import React, { createContext, useContext, useEffect, useState } from "react";

export interface PatientEvent {
  id: string;
  date: string;
  title: string;
  start?: string;
  end?: string;
}

export interface PatientEvolution {
  id: string;
  title: string;
  date: string;
  time: string;
  description: string;
}

export interface Patient {
  id: string;
  name: string;
  birthdate: string;
  phone: string;
  email: string;
  cpf: string;
  firstConsultation: string;
  events: PatientEvent[];
  evolutions: PatientEvolution[];
}

interface PatientContextType {
  patients: Patient[];
  addPatient: (p: Patient) => void;
  deletePatient: (id: string) => void;
  updatePatient: (p: Patient) => void;
  addEvent: (id: string, ev: PatientEvent) => void;
  addEvolution: (id: string, evo: PatientEvolution) => void;
}

const PatientContext = createContext<PatientContextType>({
  patients: [],
  addPatient: () => {},
  deletePatient: () => {},
  updatePatient: () => {},
  addEvent: () => {},
  addEvolution: () => {},
});

export const PatientProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [patients, setPatients] = useState<Patient[]>(() => {
    const saved = localStorage.getItem("patients");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("patients", JSON.stringify(patients));
  }, [patients]);

  const addPatient = (p: Patient) => {
    setPatients((prev) => [...prev, p]);
  };

  const deletePatient = (id: string) => {
    setPatients((prev) => prev.filter((p) => p.id !== id));
  };

  const updatePatient = (updated: Patient) => {
    setPatients((prev) =>
      prev.map((p) => (p.id === updated.id ? updated : p))
    );
  };

  const addEvent = (patientId: string, ev: PatientEvent) => {
    setPatients((prev) =>
      prev.map((p) =>
        p.id === patientId ? { ...p, events: [...p.events, ev] } : p
      )
    );
  };

  const addEvolution = (patientId: string, evo: PatientEvolution) => {
    setPatients((prev) =>
      prev.map((p) =>
        p.id === patientId ? { ...p, evolutions: [...p.evolutions, evo] } : p
      )
    );
  };

  return (
    <PatientContext.Provider
      value={{
        patients,
        addPatient,
        deletePatient,
        updatePatient,
        addEvent,
        addEvolution,
      }}
    >
      {children}
    </PatientContext.Provider>
  );
};

export const usePatients = () => useContext(PatientContext);
