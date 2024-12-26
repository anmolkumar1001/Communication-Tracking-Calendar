// import React, { useState } from "react";
// import { Form, Button, Table, Modal } from "react-bootstrap";

// function AdminModule() {
//   const [companies, setCompanies] = useState([]);
//   const [newCompany, setNewCompany] = useState({
//     name: "",
//     location: "",
//     linkedin: "",
//     emails: "",
//     phoneNumbers: "",
//     comments: "",
//     periodicity: "",
//   });
//   const [editCompany, setEditCompany] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewCompany({ ...newCompany, [name]: value });
//   };

//   const handleEditChange = (e) => {
//     const { name, value } = e.target;
//     setEditCompany({ ...editCompany, [name]: value });
//   };

//   const handleFormSubmit = (e) => {
//     e.preventDefault(); // Prevent the form from submitting
//     // Trigger validation check
//     const form = e.target;
//     if (form.checkValidity()) {
//       addCompany();
//     } else {
//       // You can show a message or handle the error if needed
//       form.reportValidity();
//     }
//   };

//   const addCompany = () => {
//     setCompanies([...companies, { ...newCompany }]);
//     setNewCompany({
//       name: "",
//       location: "",
//       linkedin: "",
//       emails: "",
//       phoneNumbers: "",
//       comments: "",
//       periodicity: "",
//     });
//   };

//   const deleteCompany = (index) => {
//     const updatedCompanies = companies.filter((_, i) => i !== index);
//     setCompanies(updatedCompanies);
//   };

//   const handleEditCompany = () => {
//     const updatedCompanies = companies.map((company) =>
//       company.name === editCompany.name ? editCompany : company
//     );
//     setCompanies(updatedCompanies);
//     setShowModal(false);
//     setEditCompany(null);
//   };

//   const handleOpenEditModal = (company) => {
//     setEditCompany({ ...company });
//     setShowModal(true);
//   };

//   return (
//     <div>
//       <h2>Admin Module</h2>
//       <Form onSubmit={handleFormSubmit}>
//         <Form.Group className="mb-3">
//           <Form.Label>Company Name</Form.Label>
//           <Form.Control
//             type="text"
//             name="name"
//             value={newCompany.name}
//             onChange={handleInputChange}
//             required
//           />
//         </Form.Group>

//         <Form.Group className="mb-3">
//           <Form.Label>Location</Form.Label>
//           <Form.Control
//             type="text"
//             name="location"
//             value={newCompany.location}
//             onChange={handleInputChange}
//             required
//           />
//         </Form.Group>

//         <Form.Group className="mb-3">
//           <Form.Label>LinkedIn Profile</Form.Label>
//           <Form.Control
//             type="text"
//             name="linkedin"
//             value={newCompany.linkedin}
//             onChange={handleInputChange}
//             required
//           />
//         </Form.Group>

//         <Form.Group className="mb-3">
//           <Form.Label>Emails</Form.Label>
//           <Form.Control
//             type="text"
//             name="emails"
//             value={newCompany.emails}
//             onChange={handleInputChange}
//             required
//           />
//         </Form.Group>

//         <Form.Group className="mb-3">
//           <Form.Label>Phone Numbers</Form.Label>
//           <Form.Control
//             type="text"
//             name="phoneNumbers"
//             value={newCompany.phoneNumbers}
//             onChange={handleInputChange}
//             required
//           />
//         </Form.Group>

//         <Form.Group className="mb-3">
//           <Form.Label>Comments</Form.Label>
//           <Form.Control
//             as="textarea"
//             rows={3}
//             name="comments"
//             value={newCompany.comments}
//             onChange={handleInputChange}
//             required
//           />
//         </Form.Group>

//         <Form.Group className="mb-3">
//           <Form.Label>Communication Periodicity</Form.Label>
//           <Form.Control
//             type="text"
//             name="periodicity"
//             value={newCompany.periodicity}
//             onChange={handleInputChange}
//             required
//           />
//         </Form.Group>

//         <Button variant="primary" type="submit">
//           Add Company
//         </Button>
//       </Form>

//       <h3 className="mt-4">Companies</h3>
//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Location</th>
//             <th>LinkedIn</th>
//             <th>Emails</th>
//             <th>Phone Numbers</th>
//             <th>Comments</th>
//             <th>Periodicity</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {companies.map((company, index) => (
//             <tr key={index}>
//               <td>{company.name}</td>
//               <td>{company.location}</td>
//               <td>{company.linkedin}</td>
//               <td>{company.emails}</td>
//               <td>{company.phoneNumbers}</td>
//               <td>{company.comments}</td>
//               <td>{company.periodicity}</td>
//               <td>
//                 <Button
//                   variant="warning"
//                   size="sm"
//                   onClick={() => handleOpenEditModal(company)}
//                   className="me-2"
//                 >
//                   Edit
//                 </Button>
//                 <Button
//                   variant="danger"
//                   size="sm"
//                   onClick={() => deleteCompany(index)}
//                 >
//                   Delete
//                 </Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>

//       {/* Edit Company Modal */}
//       <Modal show={showModal} onHide={() => setShowModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Edit Company</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {editCompany && (
//             <>
//               <Form.Group className="mb-3">
//                 <Form.Label>Company Name</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="name"
//                   value={editCompany.name}
//                   onChange={handleEditChange}
//                 />
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Label>Location</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="location"
//                   value={editCompany.location}
//                   onChange={handleEditChange}
//                 />
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Label>LinkedIn Profile</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="linkedin"
//                   value={editCompany.linkedin}
//                   onChange={handleEditChange}
//                 />
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Label>Emails</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="emails"
//                   value={editCompany.emails}
//                   onChange={handleEditChange}
//                 />
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Label>Phone Numbers</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="phoneNumbers"
//                   value={editCompany.phoneNumbers}
//                   onChange={handleEditChange}
//                 />
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Label>Comments</Form.Label>
//                 <Form.Control
//                   as="textarea"
//                   rows={3}
//                   name="comments"
//                   value={editCompany.comments}
//                   onChange={handleEditChange}
//                 />
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Label>Communication Periodicity</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="periodicity"
//                   value={editCompany.periodicity}
//                   onChange={handleEditChange}
//                 />
//               </Form.Group>
//             </>
//           )}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowModal(false)}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={handleEditCompany}>
//             Save Changes
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// }

// export default AdminModule;
