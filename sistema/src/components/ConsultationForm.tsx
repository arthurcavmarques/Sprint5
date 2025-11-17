import React, { useState } from "react";

interface ConsultationFormProps {
  onSubmit?: (data: any) => void;
}

const ConsultationForm: React.FC<ConsultationFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    patientName: "",
    doctorName: "",
    date: "",
    notes: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (onSubmit) onSubmit(formData);
    alert("Consulta registrada com sucesso!");
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Registrar Consulta</h2>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "400px" }}>

        <label>
          Nome do Paciente
          <input
            type="text"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Médico Responsável
          <input
            type="text"
            name="doctorName"
            value={formData.doctorName}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Data da Consulta
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Observações
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Salvar</button>
      </form>
    </div>
  );
};

export default ConsultationForm;
