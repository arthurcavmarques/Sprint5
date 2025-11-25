import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Form.css";

const PatientForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    birthdate: "",
    phone: "",
    email: "",
    cpf: "",
    notes: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/paciente/criarPa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        console.error("Erro ao criar paciente");
        return;
      }

      navigate("/");
    } catch (err) {
      console.error("Falha ao conectar com o servidor", err);
    }
  }

  return (
    <div className="overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Novo Paciente</h2>
          <button className="close-btn" onClick={() => navigate("/")}>✕</button>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <label>
            Nome Completo
            <input
              type="text"
              name="name"
              required
              placeholder="Nome Completo"
              value={formData.name}
              onChange={handleChange}
            />
          </label>

          <label>
            Data de Nascimento
            <input
              type="date"
              name="birthdate"
              required
              value={formData.birthdate}
              onChange={handleChange}
            />
          </label>

          <label>
            Telefone
            <input
              type="text"
              name="phone"
              required
              placeholder="(51) 98888-8888"
              value={formData.phone}
              onChange={handleChange}
            />
          </label>

          <label>
            Email
            <input
              type="email"
              name="email"
              required
              placeholder="seuemail@email.com"
              value={formData.email}
              onChange={handleChange}
            />
          </label>

          <label>
            CPF
            <input
              type="text"
              name="cpf"
              required
              placeholder="000.000.000-00"
              value={formData.cpf}
              onChange={handleChange}
            />
          </label>

          <button type="submit" className="submit-btn">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default PatientForm;
