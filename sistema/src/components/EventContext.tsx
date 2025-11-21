import { createContext, useContext, useState, type ReactNode } from "react";

// Modelo do evento
export interface EventItem {
  id: string;
  patientId: string;
  title: string;
  date: string;     // formato YYYY-MM-DD
  type: "consulta" | "aniversario" | "outro";
}

interface EventContextType {
  events: EventItem[];
  addEvent: (event: Omit<EventItem, "id">) => void;
  updateEvent: (id: string, updated: Partial<EventItem>) => void;
  deleteEvent: (id: string) => void;
  getEventsByPatient: (patientId: string) => EventItem[];
}

const EventContext = createContext<EventContextType>({
  events: [],
  addEvent: () => {},
  updateEvent: () => {},
  deleteEvent: () => {},
  getEventsByPatient: () => [],
});

export const EventProvider = ({ children }: { children: ReactNode }) => {
  const [events, setEvents] = useState<EventItem[]>([]);

  // 👉 Criar evento
  const addEvent = (event: Omit<EventItem, "id">) => {
    const newEvent: EventItem = {
      ...event,
      id: Date.now().toString(),
    };
    setEvents((prev) => [...prev, newEvent]);
  };

  // 👉 Atualizar evento existente
  const updateEvent = (id: string, updated: Partial<EventItem>) => {
    setEvents((prev) =>
      prev.map((ev) => (ev.id === id ? { ...ev, ...updated } : ev))
    );
  };

  // 👉 Excluir evento
  const deleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((ev) => ev.id !== id));
  };

  // 👉 Buscar eventos de um paciente específico
  const getEventsByPatient = (patientId: string) => {
    return events.filter((ev) => ev.patientId === patientId);
  };

  return (
    <EventContext.Provider
      value={{ events, addEvent, updateEvent, deleteEvent, getEventsByPatient }}
    >
      {children}
    </EventContext.Provider>
  );
};

// Hook para usar facilmente no app
export const useEvents = () => useContext(EventContext);
