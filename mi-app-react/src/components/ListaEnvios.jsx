// src/components/ListaEnvios.jsx
import EnvioCard from "./EnvioCard";

function ListaEnvios({ envios, onEliminar, onEditar, editandoId, setEditandoId }) {
  return (
    <div>
      <h2>Lista de Envíos</h2>
      {envios.length === 0 ? (
        <p>No hay envíos registrados.</p>
      ) : (
        envios.map((envio) => (
          <EnvioCard
            key={envio.id}
            envio={envio}
            onEliminar={onEliminar}
            onEditar={onEditar}
            editandoId={editandoId}
            setEditandoId={setEditandoId}
          />
        ))
      )}
    </div>
  );
}

export default ListaEnvios;
