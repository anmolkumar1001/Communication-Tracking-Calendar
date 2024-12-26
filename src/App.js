import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { CommunicationProvider } from "./context/Data";
import AdminModule from "./routes/AdminModule";
import UserDashboard from "./routes/UserDashboard";
import CalendarView from "./components/NotificationCalender";
import CompanyListPage from "./routes/Companies";
// import ReportsDashboard from "./routes/ReportsDashboard";
import { Container, Navbar, Nav } from "react-bootstrap";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <CommunicationProvider>
      <Router>
        <div className="app-container">
          {/* Navigation using React-Bootstrap Navbar */}
          <Navbar bg="light" expand="lg" className="mb-4">
            <Container>
              <Navbar.Brand>Communication Tracking Calendar</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                  <Nav.Link as={Link} to="/">
                    Dashboard
                  </Nav.Link>
                  <Nav.Link as={Link} to="/admin">
                    Company's Details
                  </Nav.Link>
                  <Nav.Link as={Link} to="/company">
                    Company List
                  </Nav.Link>
                  <Nav.Link as={Link} to="/calendar">
                    Calendar
                  </Nav.Link>
                  {/* <Nav.Link as={Link} to="/reports">
                    Reports & Analytics
                  </Nav.Link> */}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>

          {/* Main content area */}
          <main className="main-content">
            <Container>
              <Routes>
                <Route path="/" element={<UserDashboard />} />
                <Route path="/admin" element={<AdminModule />} />
                <Route path="/calendar" element={<CalendarView />} />
                <Route path="/company" element={<CompanyListPage />} />
                {/* <Route path="/reports" element={<ReportsDashboard />} /> */}
              </Routes>
            </Container>
          </main>
        </div>
      </Router>
    </CommunicationProvider>
  );
}

export default App;
