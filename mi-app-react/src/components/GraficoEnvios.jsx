// src/components/GraficoEnvios.jsx
import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

function GraficoEnvios({ envios }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const retrasados = envios.filter((e) => e.retraso > 0).length;
    const sinRetraso = envios.length - retrasados;

    const data = {
      labels: ["Con Retraso", "Sin Retraso"],
      datasets: [
        {
          data: [retrasados, sinRetraso],
          backgroundColor: ["#ff4d4d", "#4caf50"],
        },
      ],
    };

    const chartInstance = new Chart(canvasRef.current, {
      type: "doughnut",
      data,
      options: { responsive: true, plugins: { legend: { position: "bottom" } } },
    });

    return () => chartInstance.destroy();
  }, [envios]);

  return (
    <div style={{ width: "300px", margin: "20px auto" }}>
      <h2>Estadísticas de Retrasos</h2>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}

export default GraficoEnvios;
