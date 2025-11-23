import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import ptBrLocale from '@fullcalendar/core/locales/pt-br';


interface CalendarViewProps {
  events: any[];
  onDateClick?: (info: any) => void;
  onEventClick?: (info: any) => void;
}

const CalendarView = ({ events, onDateClick, onEventClick }: CalendarViewProps) => {
  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={events}
      dateClick={onDateClick}
      eventClick={onEventClick}
      height="80vh"
      locale="pt-br"
      locales={[ptBrLocale]}
      headerToolbar={{
        left: 'title', 
        center: '',
        right: 'prev next' 
      }}     
      buttonText={{
        prev: "<",
        next: ">",
      }}
    />
  );
};

export default CalendarView;