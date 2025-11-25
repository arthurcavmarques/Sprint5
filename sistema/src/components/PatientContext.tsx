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
  addPatient: (p: Omit<Patient, "id" | "events" | "evolutions">) => Promise<void>;
  deletePatient: (id: string) => Promise<void>;
  updatePatient: (id: string, data: Partial<Patient>) => Promise<void>;
  addEvent: (patientId: string, ev: PatientEvent) => Promise<void>;
  addEvolution: (patientId: string, ev: PatientEvolution) => Promise<void>;
}

const PatientContext = createContext<PatientContextType>({
  patients: [],
  addPatient: async () => {},
  deletePatient: async () => {},
  updatePatient: async () => {},
  addEvent: async () => {},
  addEvolution: async () => {},
});

export const PatientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    async function loadPatients() {
      try {
        const res = await fetch("http://localhost:3000/paciente/listarPa");
        const data = await res.json();
        setPatients(data);
      } catch (err) {
        console.error("Erro ao carregar pacientes", err);
      }
    }

    loadPatients();
  }, []);

  const addPatient: PatientContextType["addPatient"] = async (p) => {
  try {
    const res = await fetch("http://localhost:3000/paciente/criarPa", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(p),
    });

    if (!res.ok) return;

    const created = await res.json();

    setPatients((prev) => [...prev, created]);
  } catch (err) {
    console.error("Erro ao criar paciente", err);
  }
};

const updatePatient: PatientContextType["updatePatient"] = async (id, data) => {
  try {
    const res = await fetch(`http://localhost:3000/paciente/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) return;

    const updated = await res.json();

    setPatients((prev) => prev.map((p) => (p.id === id ? updated : p)));
  } catch (err) {
    console.error("Erro ao atualizar paciente", err);
  }
};

  const deletePatient = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:3000/paciente/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) return;

      setPatients((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Erro ao remover paciente", err);
    }
  };

  const addEvent = async (patientId: string, ev: PatientEvent) => {
    setPatients((prev) =>
      prev.map((p) => (p.id === patientId ? { ...p, events: [...p.events, ev] } : p))
    );
  };

  const addEvolution = async (patientId: string, evo: PatientEvolution) => {
    try {
      const res = await fetch("http://localhost:3000/criarEv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientId,
          ...evo,
        }),
      });

      if (!res.ok) return;

      const created = await res.json();

      setPatients((prev) =>
        prev.map((p) =>
          p.id === patientId ? { ...p, evolutions: [...p.evolutions, created] } : p
        )
      );
    } catch (err) {
      console.error("Erro ao criar evolução", err);
    }
  };

  return (
    <PatientContext.Provider
      value={{ patients, addPatient, deletePatient, updatePatient, addEvent, addEvolution }}
    >
      {children}
    </PatientContext.Provider>
  );
};

export const usePatients = () => useContext(PatientContext);
