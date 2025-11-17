import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";

import HomePage from "./pages/HomePage";
import PatientPage from "./pages/PatientPage";
import ConsultationPage from "./pages/ConsultationPage";
import CalendarPage from "./pages/CalendarPage";

const App = () => {
  return (
    <Router>
      <NavBar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/patients" element={<PatientPage />} />
        <Route path="/consultations" element={<ConsultationPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
      </Routes>
    </Router>
  );
};

export default App;
