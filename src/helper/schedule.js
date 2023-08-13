import { moment } from "../utils/dates";
import defaultEvents from "../resources/events";

const LOCAL_STORAGE_KEY = "schedule-events";

function slotToEvent(slotInfo) {
  if (!slotInfo) return null;

  const slots = slotInfo.slots || [];

  const start = slots[0];
  const end = slots.length > 1 && slots[slots.length - 1];
  const startDay = moment(start);
  const endDay = moment(end);

  // all 1 day event
  if (!end) {
    return {
      ...slotInfo,
      start: startDay,
      end: startDay.add(1, "day"),
    };
  }

  const diffDays = endDay.diff(startDay, "day");
  // Long-day event
  if (diffDays >= 1) {
    return {
      ...slotInfo,
      start: startDay,
      end: slotInfo.id ? endDay : endDay.add(1, "day"),
    };
  }

  // In-day event
  return {
    ...slotInfo,
    start: startDay,
    end: endDay,
  };
}

function getEventsFromStorage() {
  let events = [];
  if (window.localStorage.getItem(LOCAL_STORAGE_KEY) !== null) {
    events = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY));
  } else {
    updateSchedule(defaultEvents);
    events = defaultEvents;
  }
  return events.map((event) => ({
    ...event,
    start: new Date(event.start),
    end: new Date(event.end),
  }));
}

function updateSchedule(events) {
  window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(events));
}

export { slotToEvent, getEventsFromStorage, updateSchedule };
