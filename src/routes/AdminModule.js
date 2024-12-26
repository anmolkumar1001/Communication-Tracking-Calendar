import React, { useState } from "react";
import { useCommunication } from "../context/Data";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  InputGroup,
  Alert,
} from "react-bootstrap";

function AdminModule() {
  const { addCompany, updateCompany } = useCommunication();

  // Company Management State
  const [companyForm, setCompanyForm] = useState({
    id: "",
    name: "",
    location: "",
    linkedinProfile: "",
    emails: [""],
    phoneNumbers: [""],
    comments: "",
    communicationPeriodicity: 14,
  });

  // Edit Mode States
  const [editingCompany, setEditingCompany] = useState(false);

  // Alert State
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    variant: "",
  });

  // Company Form Handlers
  const handleCompanyChange = (e) => {
    const { name, value } = e.target;
    setCompanyForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEmailChange = (index, value) => {
    const newEmails = [...companyForm.emails];
    newEmails[index] = value;
    setCompanyForm((prev) => ({ ...prev, emails: newEmails }));
  };

  const handlePhoneChange = (index, value) => {
    const newPhones = [...companyForm.phoneNumbers];
    newPhones[index] = value;
    setCompanyForm((prev) => ({ ...prev, phoneNumbers: newPhones }));
  };

  const handleAddCompany = (e) => {
    e.preventDefault();
    if (editingCompany) {
      updateCompany(companyForm);
      setAlert({
        show: true,
        message: "Company updated successfully!",
        variant: "success",
      });
      setEditingCompany(false);
    } else {
      addCompany(companyForm);
      setAlert({
        show: true,
        message: "Company added successfully!",
        variant: "success",
      });
    }

    setCompanyForm({
      id: "",
      name: "",
      location: "",
      linkedinProfile: "",
      emails: [""],
      phoneNumbers: [""],
      comments: "",
      communicationPeriodicity: 14,
    });
  };

  return (
    <Container className="admin-module">
      <Card className="p-4">
        <h2>{editingCompany ? "Edit Company" : "Enter Company Details"}</h2>

        {/* Alert Message */}
        {alert.show && (
          <Alert
            variant={alert.variant}
            onClose={() => setAlert({ ...alert, show: false })}
            dismissible
          >
            {alert.message}
          </Alert>
        )}

        <Form onSubmit={handleAddCompany}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Company Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={companyForm.name}
                  onChange={handleCompanyChange}
                  placeholder="Company Name"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  name="location"
                  value={companyForm.location}
                  onChange={handleCompanyChange}
                  placeholder="Location"
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>LinkedIn Profile</Form.Label>
            <Form.Control
              type="url"
              name="linkedinProfile"
              value={companyForm.linkedinProfile}
              onChange={handleCompanyChange}
              placeholder="LinkedIn Profile"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Emails</Form.Label>
            {companyForm.emails.map((email, index) => (
              <InputGroup key={index} className="mb-2">
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => handleEmailChange(index, e.target.value)}
                  placeholder="Email Address"
                />
              </InputGroup>
            ))}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone Numbers</Form.Label>
            {companyForm.phoneNumbers.map((phone, index) => (
              <InputGroup key={index} className="mb-2">
                <Form.Control
                  type="tel"
                  value={phone}
                  onChange={(e) => handlePhoneChange(index, e.target.value)}
                  placeholder="Phone Number"
                />
              </InputGroup>
            ))}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Additional Comments</Form.Label>
            <Form.Control
              as="textarea"
              name="comments"
              value={companyForm.comments}
              onChange={handleCompanyChange}
              placeholder="Additional Comments"
              rows={3}
            />
          </Form.Group>

          <Button type="submit" variant="primary" className="me-2">
            {editingCompany ? "Update Company" : "Add Company"}
          </Button>
          {editingCompany && (
            <Button
              variant="outline-secondary"
              onClick={() => setEditingCompany(false)}
            >
              Cancel
            </Button>
          )}
        </Form>
      </Card>
    </Container>
  );
}

export default AdminModule;
