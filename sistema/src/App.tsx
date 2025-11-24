import { Routes, Route, BrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CalendarPage from "./pages/CalendarPage";
import Layout from "./components/Layout";
import PatientDetailsPage from "./pages/PatientDetailsPage";
import PatientForm from "./components/PatientForm";
import { PatientProvider } from "./components/PatientContext";
import "../src/styles/index.css"

export default function App() {
  return (
    <PatientProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} index />
            <Route path="/patients/:id" element={<PatientDetailsPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/novo-paciente" element={<PatientForm />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </PatientProvider>
   
  );
}
