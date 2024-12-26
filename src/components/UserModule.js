// import React, { useState } from "react";
// import { Modal, Button, Badge, Table, Alert } from "react-bootstrap";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import interactionPlugin from "@fullcalendar/interaction";

// function UserModule() {
//   const [events, setEvents] = useState([
//     { title: "Call ABC Corp", date: "2024-12-01" },
//     { title: "Email XYZ Ltd", date: "2024-12-05" },
//   ]);
//   const [showModal, setShowModal] = useState(false);
//   const [newEvent, setNewEvent] = useState({ title: "", date: "" });
//   const [editEvent, setEditEvent] = useState(null);
//   const [error, setError] = useState("");

//   const handleDateClick = (info) => {
//     setNewEvent({ ...newEvent, date: info.dateStr });
//     setShowModal(true);
//   };

//   const handleAddEvent = () => {
//     if (!newEvent.title) {
//       setError("Title is required!");
//       return;
//     }
//     setError("");
//     setEvents([...events, newEvent]);
//     setShowModal(false);
//   };

//   const handleEditEvent = () => {
//     if (!editEvent.title) {
//       setError("Title is required!");
//       return;
//     }
//     setError("");
//     const updatedEvents = events.map((event) =>
//       event.title === editEvent.title ? editEvent : event
//     );
//     setEvents(updatedEvents);
//     setShowModal(false);
//     setEditEvent(null);
//   };

//   const handleOpenEditModal = (event) => {
//     setEditEvent({ ...event });
//     setShowModal(true);
//   };

//   return (
//     <div>
//       <h2>User Module</h2>
//       {error && <Alert variant="danger">{error}</Alert>}
//       <div className="notifications">
//         <Badge pill bg="danger" className="me-2">
//           Overdue: {events.filter((e) => new Date(e.date) < new Date()).length}
//         </Badge>
//         <Badge pill bg="warning">
//           Due Today:{" "}
//           {
//             events.filter(
//               (e) =>
//                 new Date(e.date).toDateString() === new Date().toDateString()
//             ).length
//           }
//         </Badge>
//       </div>

//       <FullCalendar
//         plugins={[dayGridPlugin, interactionPlugin]}
//         initialView="dayGridMonth"
//         events={events}
//         dateClick={handleDateClick}
//       />

//       <Modal show={showModal} onHide={() => setShowModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>
//             {editEvent ? "Edit Communication" : "Add Communication"}
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <div>
//             <label>Title:</label>
//             <input
//               type="text"
//               className="form-control"
//               value={editEvent ? editEvent.title : newEvent.title}
//               onChange={(e) =>
//                 editEvent
//                   ? setEditEvent({ ...editEvent, title: e.target.value })
//                   : setNewEvent({ ...newEvent, title: e.target.value })
//               }
//               required
//             />
//           </div>
//           <div className="mt-3">
//             <label>Date:</label>
//             <input
//               type="text"
//               className="form-control"
//               value={editEvent ? editEvent.date : newEvent.date}
//               disabled
//             />
//           </div>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowModal(false)}>
//             Close
//           </Button>
//           <Button
//             variant="primary"
//             onClick={editEvent ? handleEditEvent : handleAddEvent}
//           >
//             {editEvent ? "Save Changes" : "Add Event"}
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       <h3 className="mt-4">Upcoming Communications</h3>
//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th>Title</th>
//             <th>Date</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {events.map((event, index) => (
//             <tr key={index}>
//               <td>{event.title}</td>
//               <td>{event.date}</td>
//               <td>
//                 <Button
//                   variant="warning"
//                   size="sm"
//                   onClick={() => handleOpenEditModal(event)}
//                 >
//                   Edit
//                 </Button>
//                 <Button
//                   variant="danger"
//                   size="sm"
//                   className="ms-2"
//                   onClick={() => {
//                     const updatedEvents = events.filter(
//                       (e) => e.title !== event.title
//                     );
//                     setEvents(updatedEvents);
//                   }}
//                 >
//                   Delete
//                 </Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </div>
//   );
// }

// export default UserModule;
