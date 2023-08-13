import * as React from "react";
import {
  getEventsFromStorage,
  slotToEvent,
  updateSchedule,
} from "../helper/schedule";
import EventModal from "./EventModal";
import Calendar from "./ui/calendar";

const Schedule = () => {
  const clickRef = React.useRef(null);
  const [events, setEvents] = React.useState(getEventsFromStorage);
  const [selectedSlot, setSelectedSlot] = React.useState(null);
  const modalKey = selectedSlot?.start?.toString();

  React.useEffect(() => {
    return () => {
      window.clearTimeout(clickRef?.current);
    };
  }, []);

  const handleCloseEventModal = React.useCallback(() => {
    setSelectedSlot(null);
  }, []);

  const handleAddNewEvent = (info) => {
    const newEvents = [...events, info];
    setEvents(newEvents);
    updateSchedule(newEvents);
    handleCloseEventModal();
  };

  const handleEditEvent = (info) => {
    const newEvents = events.map((event) =>
      event.id === info.id ? info : event,
    );
    setEvents(newEvents);
    updateSchedule(newEvents);
    handleCloseEventModal();
  };

  const handleDeleteEvent = (id) => {
    const newEvents = events.filter((event) => event.id !== id);
    setEvents(newEvents);
    updateSchedule(newEvents);
    handleCloseEventModal();
  };

  const { defaultDate } = React.useMemo(
    () => ({
      defaultDate: new Date(),
    }),
    [],
  );

  const onSelectEvent = React.useCallback((event) => {
    window.clearTimeout(clickRef?.current);
    clickRef.current = window.setTimeout(() => {
      const eventSlotInfo = { ...event, slots: [event.start, event.end] };
      setSelectedSlot(eventSlotInfo);
    }, 150);
  }, []);

  const onSelectSlot = React.useCallback((slotInfo) => {
    window.clearTimeout(clickRef?.current);
    clickRef.current = window.setTimeout(() => {
      setSelectedSlot(slotInfo);
    }, 150);
  }, []);

  return (
    <>
      <Calendar
        events={events}
        defaultDate={defaultDate}
        onSelectSlot={onSelectSlot}
        onSelectEvent={onSelectEvent}
        selectable
      />
      <EventModal
        key={modalKey}
        isEditMode={selectedSlot?.id}
        data={slotToEvent(selectedSlot)}
        onClose={handleCloseEventModal}
        onDelete={handleDeleteEvent}
        onAddNew={handleAddNewEvent}
        onEdit={handleEditEvent}
      />
    </>
  );
};

export default Schedule;
