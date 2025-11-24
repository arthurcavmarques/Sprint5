import { useEffect, useState } from "react";
import CalendarView from "../components/CalendarView";
import CreateConsultationModal from "../components/CreateConsultationModal";
import EditConsultationModal from "../components/EditConsultationModal";
import { usePatients } from "../components/PatientContext";

// ⚠️ Se você está usando um cliente HTTP customizado (como 'api'), importe-o aqui.
// Caso contrário, usaremos apenas o 'fetch' nativo.
// import api from '../services/api'; 


const CalendarPage = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | undefined>(undefined);
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);

  const { patients } = usePatients();

  // ---------------------------------
  // 🆕 FUNÇÃO PARA CARREGAR CONSULTAS (EXTRAÍDA DO useEffect)
  // ---------------------------------
  const fetchAllEvents = () => {
    fetch("/api/consultations") // <-- Usando a URL original do seu código para GET
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
            backgroundColor: "#ff9f43",
            borderColor: "#ff9f43",
            textColor: "#000",
          }));

        setEvents([...formattedConsultations, ...birthdayEvents]);
      })
      .catch(() => {
        setEvents([]);
      });
  };

  // ---------------------------------
  // CARREGAR CONSULTAS + ANIVERSÁRIOS
  // ---------------------------------
  useEffect(() => {
    // 💡 Agora apenas chama a função auxiliar
    fetchAllEvents(); 
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

  // ---------------------------------
  // 🛠️ FUNÇÃO CORRIGIDA PARA SALVAR NO BACKEND
  // ---------------------------------
  const handleCreateSave = async (payload: any) => { // 🚨 Tornada assíncrona
    // Prepara o objeto para o backend, usando os nomes de campos que o NestJS espera
    const backendPayload = {
      title: payload.title,
      dataEvento: payload.date,       // Assumindo que o backend espera 'data'
      pacienteId: payload.patientId, // Assumindo que o backend espera 'pacienteId'
    };
    
    try {
      // 1. CHAMA O BACKEND (POST) USANDO FETCH
      const response = await fetch('/consulta', { // Endpoint de criação do NestJS
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(backendPayload),
      });

      if (!response.ok) {
        throw new Error(`Falha no servidor. Status: ${response.status}`);
      }

      // 2. Se o POST foi OK, recarrega a lista do backend
      fetchAllEvents();
      
    } catch (error) {
      console.error("Erro ao salvar agendamento:", error);
      alert("Erro ao salvar agendamento no servidor. Verifique o console e o backend.");
      return; // 🛑 Interrompe e não fecha o modal
    }
    
    // 3. Fecha o modal apenas se tudo deu certo
    setCreateOpen(false);
  };
  // ---------------------------------

  const handleEditSave = (payload: any) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === payload.id ? { ...e, ...payload } : e))
    );

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