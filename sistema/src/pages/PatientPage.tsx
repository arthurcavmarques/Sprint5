const PatientPage = () => {
  return (
    <div style={{ padding: "20px" }}>
      {/* Cabeçalho */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Pacientes</h2>

        <button>+ Novo Paciente</button>
      </div>

      {/* Barra de busca */}
      <input
        type="text"
        placeholder="Pesquisar por nome ou prontuário"
        style={{ width: "300px", marginTop: "10px" }}
      />

      {/* Card do Paciente */}
      <div
        style={{
          marginTop: "30px",
          border: "1px solid #ccc",
          padding: "20px",
          width: "250px",
          borderRadius: "10px",
        }}
      >
        {/* Avatar + infos */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "45px",
              height: "45px",
              borderRadius: "50%",
              background: "#0a7564",
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "bold",
            }}
          >
            NR
          </div>

          <div>
            <p>000001</p>
            <b>Naiumy dos Reis</b>
          </div>
        </div>

        <hr style={{ margin: "15px 0" }} />

        {/* Informações */}
        <p>
          <b>Recorrência:</b> Nenhuma recorrência registrada
        </p>

        <p>
          <b>Última Consulta:</b> Nenhuma consulta registrada
        </p>

        <p>
          <b>Próxima Consulta:</b> Nenhuma consulta agendada
        </p>

        <hr style={{ margin: "15px 0" }} />

        {/* Botões */}
        <div style={{ display: "flex", gap: "10px" }}>
          <button>Copiar Email</button>
          <button>WhatsApp</button>
        </div>
      </div>
    </div>
  );
};

export default PatientPage;
