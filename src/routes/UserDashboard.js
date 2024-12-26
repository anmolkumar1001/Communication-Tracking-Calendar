import React, { useState } from "react";
import { useCommunication } from "../context/Data";
import {
  Button,
  Form,
  Modal,
  FormCheck,
  Container,
  Row,
  Col,
  Tooltip,
  OverlayTrigger,
  Card,
} from "react-bootstrap";

function UserDashboard() {
  const {
    state,
    addCommunication,
    getLastFiveCommunications,
    getNextScheduledCommunication,
    getOverdueCommunications,
  } = useCommunication();

  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [communicationModal, setCommunicationModal] = useState(false);

  const [communicationForm, setCommunicationForm] = useState({
    type: "",
    date: new Date().toISOString().split("T")[0],
    notes: "",
  });

  const handleCompanySelect = (companyId) => {
    setSelectedCompanies((prev) =>
      prev.includes(companyId)
        ? prev.filter((id) => id !== companyId)
        : [...prev, companyId]
    );
  };

  const handleCommunicationLog = (e) => {
    e.preventDefault();
    selectedCompanies.forEach((companyId) => {
      addCommunication({
        ...communicationForm,
        companyId,
        timestamp: new Date(communicationForm.date),
      });
    });
    setCommunicationModal(false);
    setSelectedCompanies([]);
  };

  const renderCommunicationTooltip = (communication) => {
    return (
      <Tooltip>
        <p>Type: {communication.type}</p>
        <p>Date: {new Date(communication.timestamp).toLocaleDateString()}</p>
        <p>Notes: {communication.notes || "No notes"}</p>
        <p>Sequence: {communication.sequence}</p>
      </Tooltip>
    );
  };

  return (
    <div className="user-dashboard">
      <Container className="mt-4">
        <h1 className="text-center mb-4">Dashboard</h1>

        <section className="notifications mb-4">
          <h2 className="text-center">Notifications</h2>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Overdue Communications</Card.Title>
              {getOverdueCommunications().map((company) => (
                <Card.Text key={company.id}>
                  <strong>{company.name}</strong> - Overdue by{" "}
                  {Math.floor(
                    (new Date() - new Date(company.lastCommunicationDate)) /
                      (1000 * 60 * 60 * 24)
                  )}{" "}
                  days
                </Card.Text>
              ))}
            </Card.Body>
          </Card>
        </section>

        <Row>
          {state.companies.map((company) => {
            const lastFiveCommunications = getLastFiveCommunications(
              company.id
            );
            const nextScheduledCommunication = getNextScheduledCommunication(
              company.id
            );

            return (
              <Col key={company.id} md={6} lg={4} className="mb-4">
                <Card className="h-100">
                  <Card.Body>
                    <FormCheck
                      type="checkbox"
                      checked={selectedCompanies.includes(company.id)}
                      onChange={() => handleCompanySelect(company.id)}
                      id={`company-checkbox-${company.id}`}
                      className="mb-2"
                    />
                    <Card.Title>{company.name}</Card.Title>

                    <div className="last-communications mb-3">
                      <h6>Recent Communications</h6>
                      {lastFiveCommunications.map((comm) => (
                        <OverlayTrigger
                          key={comm.id}
                          placement="top"
                          overlay={renderCommunicationTooltip(comm)}
                        >
                          <div className="communication-item">
                            {comm.type} -{" "}
                            {new Date(comm.timestamp).toLocaleDateString()}
                          </div>
                        </OverlayTrigger>
                      ))}
                    </div>

                    <div className="next-communication">
                      <h6>Next Scheduled Communication</h6>
                      {nextScheduledCommunication ? (
                        <div>
                          {nextScheduledCommunication.type} -{" "}
                          {new Date(
                            nextScheduledCommunication.date
                          ).toLocaleDateString()}
                        </div>
                      ) : (
                        <div>No scheduled communication</div>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>

        <div className="text-center mt-4">
          <Button
            onClick={() => setCommunicationModal(true)}
            disabled={selectedCompanies.length === 0}
          >
            Log Communication
          </Button>
        </div>

        {/* Communication Modal */}
        <Modal
          show={communicationModal}
          onHide={() => setCommunicationModal(false)}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Log Communication</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleCommunicationLog}>
              <Form.Group controlId="communicationType">
                <Form.Label>Select Communication Type</Form.Label>
                <Form.Control
                  as="select"
                  value={communicationForm.type}
                  onChange={(e) =>
                    setCommunicationForm((prev) => ({
                      ...prev,
                      type: e.target.value,
                    }))
                  }
                  required
                >
                  <option value="">Select Communication Type</option>
                  {state.communicationMethods.map((method) => (
                    <option key={method.id} value={method.name}>
                      {method.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="communicationDate">
                <Form.Label>Communication Date</Form.Label>
                <Form.Control
                  type="date"
                  value={communicationForm.date}
                  onChange={(e) =>
                    setCommunicationForm((prev) => ({
                      ...prev,
                      date: e.target.value,
                    }))
                  }
                  required
                />
              </Form.Group>
              <Form.Group controlId="communicationNotes">
                <Form.Label>Notes</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Communication Notes"
                  value={communicationForm.notes}
                  onChange={(e) =>
                    setCommunicationForm((prev) => ({
                      ...prev,
                      notes: e.target.value,
                    }))
                  }
                />
              </Form.Group>
              <div className="modal-buttons">
                <Button type="submit" variant="primary">
                  Log Communication
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setCommunicationModal(false)}
                >
                  Cancel
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
}

export default UserDashboard;
