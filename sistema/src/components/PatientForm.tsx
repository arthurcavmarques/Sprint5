import React, { useState } from "react";

interface PatientFormProps {
  onSubmit?: (data: any) => void;
}

const PatientForm: React.FC<PatientFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    phone: "",
    address: "",
    notes: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (onSubmit) onSubmit(formData);
    alert("Paciente cadastrado com sucesso!");
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Cadastrar Paciente</h2>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          maxWidth: "400px",
        }}
      >
        <label>
          Nome
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
          />
        </label>

        <label>
          Idade
          <input
            type="number"
            name="age"
            required
            value={formData.age}
            onChange={handleChange}
          />
        </label>

        <label>
          Telefone
          <input
            type="text"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
          />
        </label>

        <label>
          Endereço
          <input
            type="text"
            name="address"
            required
            value={formData.address}
            onChange={handleChange}
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

export default PatientForm;
