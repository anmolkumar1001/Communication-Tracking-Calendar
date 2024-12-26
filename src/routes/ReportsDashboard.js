// import React, { useState } from "react";
// import { useCommunication } from "../context/Data";
// import { Container, Row, Col, Button, Form } from "react-bootstrap";
// import { Bar, Pie, Line } from "react-chartjs-2";
// import jsPDF from "jspdf";
// //import "../routes/ReportDashboard.css"; // Ensure the file exists and path is correct

// function ReportsDashboard() {
//   const { state, getOverdueCommunications } = useCommunication();

//   // Check if getOverdueCommunications is a valid function
//   if (typeof getOverdueCommunications !== "function") {
//     console.error("getOverdueCommunications is not a function");
//     return <div>Error: Unable to fetch overdue communications.</div>;
//   }

//   // eslint-disable-next-line react-hooks/rules-of-hooks
//   const [selectedCompany, setSelectedCompany] = useState("");
//   // eslint-disable-next-line react-hooks/rules-of-hooks
//   const [dateRange, setDateRange] = useState({ start: "", end: "" });

//   // Sample data for visualization
//   const communicationFrequencyData = {
//     labels: ["LinkedIn", "Email", "Phone Call", "Meeting"],
//     datasets: [
//       {
//         label: "Frequency",
//         data: [12, 19, 7, 5],
//         backgroundColor: ["#4e73df", "#1cc88a", "#36b9cc", "#f6c23e"],
//       },
//     ],
//   };

//   const overdueTrendsData = {
//     labels: ["Jan", "Feb", "Mar", "Apr", "May"],
//     datasets: [
//       {
//         label: "Overdue Communications",
//         data: [5, 9, 4, 12, 6],
//         borderColor: "#f6c23e",
//         backgroundColor: "rgba(246, 194, 62, 0.2)",
//       },
//     ],
//   };

//   const handlePDFExport = () => {
//     const doc = new jsPDF();
//     doc.text("Reports & Analytics", 10, 10);
//     doc.save("reports.pdf");
//   };

//   return (
//     <Container className="dashboard-container">
//       <h1 className="dashboard-title">Reports & Analytics</h1>

//       {/* Filters */}
//       <Row className="mb-4 filters-row">
//         <Col>
//           <Form.Select
//             className="filter-dropdown"
//             onChange={(e) => setSelectedCompany(e.target.value)}
//             value={selectedCompany}
//           >
//             <option value="">Select Company</option>
//             {state?.companies?.map((company) => (
//               <option key={company.id} value={company.id}>
//                 {company.name}
//               </option>
//             ))}
//           </Form.Select>
//         </Col>
//         <Col>
//           <Form.Control
//             type="date"
//             className="filter-date"
//             value={dateRange.start}
//             onChange={(e) =>
//               setDateRange((prev) => ({ ...prev, start: e.target.value }))
//             }
//           />
//         </Col>
//         <Col>
//           <Form.Control
//             type="date"
//             className="filter-date"
//             value={dateRange.end}
//             onChange={(e) =>
//               setDateRange((prev) => ({ ...prev, end: e.target.value }))
//             }
//           />
//         </Col>
//         <Col>
//           <Button className="export-button" onClick={handlePDFExport}>
//             Export to PDF
//           </Button>
//         </Col>
//       </Row>

//       {/* Communication Frequency Report */}
//       <Row className="chart-row">
//         <Col>
//           <h3 className="chart-title">Communication Frequency</h3>
//           <Bar data={communicationFrequencyData} />
//         </Col>
//       </Row>

//       {/* Engagement Effectiveness */}
//       <Row className="chart-row">
//         <Col>
//           <h3 className="chart-title">Engagement Effectiveness</h3>
//           <Pie data={communicationFrequencyData} />
//         </Col>
//       </Row>

//       {/* Overdue Communication Trends */}
//       <Row className="chart-row">
//         <Col>
//           <h3 className="chart-title">Overdue Trends</h3>
//           <Line data={overdueTrendsData} />
//         </Col>
//       </Row>
//     </Container>
//   );
// }

// export default ReportsDashboard;
