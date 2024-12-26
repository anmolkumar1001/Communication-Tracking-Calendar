import React, { useState } from "react";
import {
  Form,
  Button,
  Card,
  Container,
  Row,
  Col,
  InputGroup,
} from "react-bootstrap";
import { useCommunication } from "../context/Data";

function CompanyListPage() {
  const { state, updateCompany, deleteCompany } = useCommunication();

  const [editingCompany, setEditingCompany] = useState(null);
  const [companyForm, setCompanyForm] = useState({
    id: "",
    name: "",
    location: "",
    linkedinProfile: "",
    emails: [""],
    phoneNumbers: [""],
    comments: "",
    communicationPeriodicity: 14,
    communicationMethods: [],
  });

  // State for success message
  const [successMessage, setSuccessMessage] = useState("");

  const handleCompanyChange = (e) => {
    const { name, value } = e.target;
    setCompanyForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEmailChange = (index, value) => {
    const updatedEmails = [...companyForm.emails];
    updatedEmails[index] = value;
    setCompanyForm((prev) => ({ ...prev, emails: updatedEmails }));
  };

  const handleAddEmail = () => {
    setCompanyForm((prev) => ({ ...prev, emails: [...prev.emails, ""] }));
  };

  const handleUpdateCompany = (e) => {
    e.preventDefault();
    updateCompany(companyForm);
    setEditingCompany(null);
    setSuccessMessage("Company updated successfully!"); // Set success message on update

    // Hide success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  const startEditCompany = (company) => {
    setEditingCompany(company.id);
    setCompanyForm({ ...company });
  };

  return (
    <Container>
      <h1 className="text-center my-4">Company Administration</h1>

      {/* Display success message if exists */}
      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}

      {state.companies.map((company) => (
        <Card className="mb-3" key={company.id}>
          <Card.Body>
            {editingCompany === company.id ? (
              <Form onSubmit={handleUpdateCompany}>
                <Form.Group className="mb-3">
                  <Form.Label>Company Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={companyForm.name}
                    onChange={handleCompanyChange}
                    placeholder="Enter Company Name"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    name="location"
                    value={companyForm.location}
                    onChange={handleCompanyChange}
                    placeholder="Enter Location"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>LinkedIn Profile</Form.Label>
                  <Form.Control
                    type="url"
                    name="linkedinProfile"
                    value={companyForm.linkedinProfile}
                    onChange={handleCompanyChange}
                    placeholder="Enter LinkedIn URL"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Emails</Form.Label>
                  {companyForm.emails.map((email, index) => (
                    <InputGroup className="mb-2" key={index}>
                      <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) =>
                          handleEmailChange(index, e.target.value)
                        }
                        placeholder="Enter Email"
                      />
                    </InputGroup>
                  ))}
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleAddEmail}
                  >
                    Add Email
                  </Button>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Comments</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="comments"
                    value={companyForm.comments}
                    onChange={handleCompanyChange}
                    rows={3}
                    placeholder="Add comments"
                  />
                </Form.Group>

                <Button variant="success" type="submit" className="me-2">
                  Save Changes
                </Button>
                <Button
                  variant="outline-secondary"
                  onClick={() => setEditingCompany(null)}
                >
                  Cancel
                </Button>
              </Form>
            ) : (
              <>
                <Card.Title>{company.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Location: {company.location}
                </Card.Subtitle>
                <Card.Text>
                  <strong>LinkedIn:</strong> {company.linkedinProfile || "N/A"}{" "}
                  <br />
                  <strong>Communication Frequency:</strong>{" "}
                  {company.communicationPeriodicity} days
                </Card.Text>

                <Row>
                  <Col>
                    <h6>Emails:</h6>
                    {company.emails.length ? (
                      <ul>
                        {company.emails.map((email, idx) => (
                          <li key={idx}>{email}</li>
                        ))}
                      </ul>
                    ) : (
                      <p>No emails available</p>
                    )}
                  </Col>
                </Row>

                <Button
                  variant="primary"
                  onClick={() => startEditCompany(company)}
                  className="me-2"
                >
                  Edit Company
                </Button>
                <Button
                  variant="danger"
                  onClick={() => deleteCompany(company.id)}
                >
                  Delete Company
                </Button>
              </>
            )}
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
}

export default CompanyListPage;
