/* eslint-disable react/prop-types */
import * as React from "react";
import { DateTimePicker } from "./ui/date-picker";
import { Modal, ModalActions, ModalContent, ModalTitle } from "./ui/dialog";
import { TextField } from "./ui/text-field";
import { Button } from "./ui/button";

const EventModal = ({
  data,
  isEditMode,
  onClose,
  onDelete,
  onAddNew,
  onEdit,
}) => {
  const getTitle = () => {
    if (!data || data.isNoTitle) return "";

    return data.title;
  };

  const [title, setTitle] = React.useState(getTitle);
  const [startTime, setStartTime] = React.useState(data?.start);
  const [endTime, setEndTime] = React.useState(data?.end);

  const isValidInfo =
    startTime?.isValid() &&
    endTime?.isValid() &&
    (startTime?.isSame(endTime) || startTime?.isBefore(endTime));

  const saveEvent = () => {
    const info = {
      id: isEditMode ? data.id : crypto.randomUUID(),
      title: title || "(No title)",
      isNoTitle: !title,
      start: startTime.toDate(),
      end: endTime.toDate(),
    };

    isEditMode ? onEdit(info) : onAddNew(info);
  };

  return (
    <Modal open={!!data} onClose={onClose} fullWidth>
      <ModalTitle>{isEditMode ? "Edit event" : "New event"}</ModalTitle>
      <ModalContent>
        <div className="space-y-4">
          <TextField
            autoFocus={!isEditMode}
            id="event-name"
            label="Event Name"
            variant="standard"
            fullWidth
            margin="dense"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="flex flex-col sm:flex-row gap-x-10 gap-y-4">
            <DateTimePicker
              label="Start Time"
              showTime={true}
              value={startTime}
              onChange={(newValue) => setStartTime(newValue)}
            />
            <DateTimePicker
              label="End Time"
              showTime={true}
              minDateTime={startTime}
              value={endTime}
              onChange={(newValue) => setEndTime(newValue)}
            />
          </div>
        </div>
      </ModalContent>
      <ModalActions>
        {isEditMode ? (
          <div className="w-full px-2 flex justify-between">
            <Button onClick={() => onDelete(data.id)} color="error">
              Delete
            </Button>
            <div className="flex">
              <Button onClick={onClose} color="inherit">
                Cancel
              </Button>
              <Button disabled={!isValidInfo} onClick={saveEvent}>
                Save
              </Button>
            </div>
          </div>
        ) : (
          <>
            <Button onClick={onClose} color="inherit">
              Cancel
            </Button>
            <Button disabled={!isValidInfo} onClick={saveEvent}>
              Save
            </Button>
          </>
        )}
      </ModalActions>
    </Modal>
  );
};

export default EventModal;
