import { useEffect, useState } from "react";
import CalendarView from "../components/CalendarView";
import CreateConsultationModal from "../components/CreateConsultationModal";
import EditConsultationModal from "../components/EditConsultationModal";
import { usePatients } from "../components/PatientContext";

const CalendarPage = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | undefined>(undefined);
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);

  const { patients } = usePatients();

  // ---------------------------------
  // CARREGAR CONSULTAS + ANIVERSÁRIOS
  // ---------------------------------
  useEffect(() => {
    fetch("/api/consultations")
      .then((res) => res.json())
      .then((data) => {
        const formattedConsultations = data.map((c: any) => ({
          id: c.id,
          title: c.patientName,
          date: c.date,
          patientId: c.patientId,
        }));

        const year = new Date().getFullYear();

       const birthdayEvents = patients
  .filter((p: any) => p.birthdate)
  .map((p: any) => ({
    id: `bday-${p.id}`,
    title: `🎂 Aniversário de ${p.name}`,
    date: `${year}-${p.birthdate.substring(5)}`,
    patientId: p.id,
    isBirthday: true,

    // COR ESPECIAL DO ANIVERSÁRIO
    backgroundColor: "#ff9f43",
    borderColor: "#ff9f43",
    textColor: "#000",
  }));

        setEvents([...formattedConsultations, ...birthdayEvents]);
      })
      .catch(() => {
        setEvents([]);
      });
  }, [patients]);

  const handleDateClick = (info: any) => {
    setSelectedDate(info.dateStr);
    setCreateOpen(true);
  };

  const handleEventClick = (info: any) => {
    const ev = info.event;
    if (ev.extendedProps?.isBirthday) {
      return;
    }

    setSelectedEvent({
      id: ev.id,
      title: ev.title,
      date: ev.startStr?.split("T")[0] ?? ev.startStr,
      patientId: ev.extendedProps?.patientId,
    });

    setEditOpen(true);
  };

  const handleCreateSave = async (payload: any) => {
    const body = {
      patientId: payload.patientId,
      date: payload.date,
      title: payload.title,
    };

    try {
      const res = await fetch("/api/consultations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const saved = await res.json();

      const newEv = {
        id: saved.id,
        title: saved.patientName || body.title,
        date: saved.date,
        patientId: saved.patientId,
      };

      setEvents((prev) => [...prev, newEv]);
    } catch (err) {
      console.error("Erro ao salvar consulta:", err);
    }

    setCreateOpen(false);
  };

  const handleEditSave = async (payload: any) => {
    try {
      await fetch(`/api/consultations/${payload.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      setEvents((prev) =>
        prev.map((e) => (e.id === payload.id ? { ...e, ...payload } : e))
      );
    } catch (err) {
      console.error("Erro ao atualizar consulta:", err);
    }

    setEditOpen(false);
    setSelectedEvent(null);
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/consultations/${id}`, {
        method: "DELETE",
      });

      setEvents((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      console.error("Erro ao deletar consulta:", err);
    }

    setEditOpen(false);
    setSelectedEvent(null);
  };

  return (
    <div style={{ padding: "20px" }}>
      <CalendarView
        events={events}
        onDateClick={handleDateClick}
        onEventClick={handleEventClick}
      />

      <CreateConsultationModal
        visible={createOpen}
        initialDate={selectedDate}
        onClose={() => setCreateOpen(false)}
        onSave={handleCreateSave}
      />

      <EditConsultationModal
        visible={editOpen}
        event={selectedEvent}
        onClose={() => setEditOpen(false)}
        onSave={handleEditSave}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default CalendarPage;
