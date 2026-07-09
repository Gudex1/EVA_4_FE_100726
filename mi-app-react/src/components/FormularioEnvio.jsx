// src/components/FormularioEnvio.jsx
import { useState } from "react";

function FormularioEnvio({ onGuardar }) {
  const [cliente, setCliente] = useState("");
  const [destino, setDestino] = useState("");
  const [valorBase, setValorBase] = useState("");
  const [fechaDespacho, setFechaDespacho] = useState("");
  const [fechaComprometida, setFechaComprometida] = useState("");
  const [fechaReal, setFechaReal] = useState("");
  const [error, setError] = useState("");

  const manejarSubmit = (e) => {
    e.preventDefault();

    // 🔹 Validaciones
    if (!cliente || !destino || !valorBase || !fechaDespacho || !fechaComprometida || !fechaReal) {
      setError("Todos los campos son obligatorios.");
      return;
    }
    if (new Date(fechaDespacho) > new Date()) {
      setError("La fecha de despacho no puede ser futura.");
      return;
    }

    const retraso =
      new Date(fechaReal) > new Date(fechaComprometida)
        ? Math.ceil((new Date(fechaReal) - new Date(fechaComprometida)) / (1000 * 60 * 60 * 24))
        : 0;

    const nuevoEnvio = {
      id: Date.now(),
      cliente,
      destino,
      valorBase: parseFloat(valorBase),
      fechaDespacho,
      fechaComprometida,
      fechaReal,
      retraso,
      total: parseFloat(valorBase) + retraso * 1000, // ejemplo de cálculo
    };

    onGuardar(nuevoEnvio);

    // Reset
    setCliente("");
    setDestino("");
    setValorBase("");
    setFechaDespacho("");
    setFechaComprometida("");
    setFechaReal("");
    setError("");
  };

  return (
    <form onSubmit={manejarSubmit} className="formulario">
      <h2>Registrar Envío</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input type="text" placeholder="Cliente" value={cliente} onChange={(e) => setCliente(e.target.value)} />
      <input type="text" placeholder="Destino" value={destino} onChange={(e) => setDestino(e.target.value)} />
      <input type="number" placeholder="Valor Base" value={valorBase} onChange={(e) => setValorBase(e.target.value)} />
      <input type="date" value={fechaDespacho} onChange={(e) => setFechaDespacho(e.target.value)} />
      <input type="date" value={fechaComprometida} onChange={(e) => setFechaComprometida(e.target.value)} />
      <input type="date" value={fechaReal} onChange={(e) => setFechaReal(e.target.value)} />
      <button type="submit" className="save">Guardar</button>
    </form>
  );
}

export default FormularioEnvio;
