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

  useEffect(() => {
    fetch("/api/consultations")
      .then(res => res.json())
      .then(data => {
        const formatted = data.map((c: any) => ({
          id: c.id,
          title: c.patientName,
          date: c.date,
          patientId: c.patientId,
        }));
        setEvents(formatted);
      }).catch(() => {
        setEvents([]);
      });
  }, []);

  const handleDateClick = (info: any) => {
    setSelectedDate(info.dateStr);
    setCreateOpen(true);
  };

  const handleEventClick = (info: any) => {
    const ev = info.event;
    setSelectedEvent({ id: ev.id, title: ev.title, date: ev.startStr?.split("T")[0] ?? ev.startStr, patientId: ev.extendedProps?.patientId });
    setEditOpen(true);
  };

  const handleCreateSave = (payload: any) => {
    const id = String(Date.now()).slice(-6);
    const patientName = patients.find((p: any) => p.id === payload.patientId)?.name ?? payload.title;
    const newEv = { id, title: payload.title || patientName, date: payload.date, patientId: payload.patientId };
    setEvents((prev) => [...prev, newEv]);
    setCreateOpen(false);
  };

  const handleEditSave = (payload: any) => {
    setEvents((prev) => prev.map((e) => (e.id === payload.id ? { ...e, ...payload } : e)));
    setEditOpen(false);
    setSelectedEvent(null);
  };

  const handleDelete = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
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
