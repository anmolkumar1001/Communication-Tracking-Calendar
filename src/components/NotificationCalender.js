import React, { useState, useMemo } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useCommunication } from "../context/Data";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Modal, Button } from "react-bootstrap"; // Import React-Bootstrap components
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap styles

const localizer = momentLocalizer(moment);

function CalendarView() {
  const { state, getNextScheduledCommunication } = useCommunication();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false); // Modal visibility state

  // Transform past communications into calendar events
  const pastEvents = useMemo(() => {
    if (!state?.communications || !state?.companies) return [];
    return state.communications.map((comm) => {
      const company = state.companies.find((c) => c.id === comm.companyId);
      return {
        title: `${company ? company.name : "Unknown Company"} - ${comm.type}`,
        start: new Date(comm.timestamp),
        end: new Date(comm.timestamp),
        allDay: true,
        resource: comm,
        isPastEvent: true,
      };
    });
  }, [state.communications, state.companies]);

  // Generate upcoming communication events
  const upcomingEvents = useMemo(() => {
    if (!state?.companies || !getNextScheduledCommunication) return [];
    return state.companies
      .map((company) => {
        const nextCommunication = getNextScheduledCommunication(company.id);
        if (!nextCommunication) return null;

        return {
          title: `${company.name} - Next ${nextCommunication.type}`,
          start: new Date(nextCommunication.date),
          end: new Date(nextCommunication.date),
          allDay: true,
          resource: {
            companyId: company.id,
            companyName: company.name,
            type: nextCommunication.type,
            sequence: nextCommunication.sequence,
          },
          isUpcomingEvent: true,
        };
      })
      .filter(Boolean); // Remove null values
  }, [state.companies, getNextScheduledCommunication]);

  // Combine past and upcoming events
  const events = useMemo(
    () => [...pastEvents, ...upcomingEvents],
    [pastEvents, upcomingEvents]
  );

  const handleSelectEvent = (event) => {
    setSelectedEvent(event.resource);
    setShowModal(true); // Show the modal when an event is selected
  };

  const closeEventDetails = () => {
    setShowModal(false); // Close the modal
    setSelectedEvent(null);
  };

  // Custom event style function
  const eventStyleGetter = (event) => {
    let backgroundColor = event.isPastEvent ? "#3498db" : "#2ecc71";
    let style = {
      backgroundColor,
      borderRadius: "6px",
      opacity: 0.9,
      color: "white",
    };
    return { style };
  };

  return (
    <div className="calendar-view">
      <h1>Communication Calendar</h1>

      <Calendar
        localizer={localizer}
        events={events || []} // Ensure events is an array
        startAccessor="start"
        endAccessor="end"
        style={{ height: 300 }}
        onSelectEvent={handleSelectEvent}
        eventPropGetter={eventStyleGetter}
      />

      {/* React-Bootstrap Modal for event details */}
      <Modal show={showModal} onHide={closeEventDetails}>
        <Modal.Header closeButton>
          <Modal.Title>Communication Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedEvent ? (
            selectedEvent.companyName ? (
              <>
                <p>
                  <strong>Company:</strong> {selectedEvent.companyName}
                </p>
                <p>
                  <strong>Next Communication:</strong> {selectedEvent.type}
                </p>
                <p>
                  <strong>Scheduled Date:</strong>{" "}
                  {moment(selectedEvent.start).format("MMMM Do, YYYY")}
                </p>
              </>
            ) : (
              <>
                <p>
                  <strong>Type:</strong> {selectedEvent.type || "N/A"}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {moment(selectedEvent.timestamp).format("MMMM Do, YYYY")}
                </p>
                <p>
                  <strong>Notes:</strong>{" "}
                  {selectedEvent.notes || "No additional notes"}
                </p>
              </>
            )
          ) : (
            <p>No event details available.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeEventDetails}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CalendarView;
