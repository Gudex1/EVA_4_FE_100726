// src/components/EnvioCard.jsx
function EnvioCard({ envio, onEliminar, onEditar, editandoId, setEditandoId }) {
  const retrasoAlto = envio.retraso > 5;
  const totalAlto = envio.total > 2000000;

  return (
    <div className={`asignatura-card ${retrasoAlto ? "alert-retraso" : totalAlto ? "alert-total" : ""}`}>
      {editandoId === envio.id ? (
        <>
          <input type="text" value={envio.cliente} onChange={(e) => onEditar(envio.id, "cliente", e.target.value)} />
          <input type="text" value={envio.destino} onChange={(e) => onEditar(envio.id, "destino", e.target.value)} />
          <input type="number" value={envio.valorBase} onChange={(e) => onEditar(envio.id, "valorBase", parseFloat(e.target.value))} />
          <input type="date" value={envio.fechaDespacho} onChange={(e) => onEditar(envio.id, "fechaDespacho", e.target.value)} />
          <input type="date" value={envio.fechaComprometida} onChange={(e) => onEditar(envio.id, "fechaComprometida", e.target.value)} />
          <input type="date" value={envio.fechaReal} onChange={(e) => onEditar(envio.id, "fechaReal", e.target.value)} />
          <button className="save" onClick={() => setEditandoId(null)}>Guardar Cambios</button>
        </>
      ) : (
        <>
          <h3>{envio.cliente} → {envio.destino}</h3>
          <p>Total: ${envio.total}</p>
          <p>Retraso: {envio.retraso} días</p>
          <button className="edit" onClick={() => setEditandoId(envio.id)}>Editar</button>
          <button className="delete" onClick={() => onEliminar(envio.id)}>Eliminar</button>
        </>
      )}
    </div>
  );
}

export default EnvioCard;
