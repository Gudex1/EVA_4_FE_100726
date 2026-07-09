import { useState, useEffect } from 'react';

const ExpenseForm = ({ addOrUpdateExpense, expenseToEdit, clearEdit }) => {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');

  // Cargar datos si se está editando un registro
  useEffect(() => {
    if (expenseToEdit) {
      setCategory(expenseToEdit.category);
      setAmount(expenseToEdit.amount);
      setDate(expenseToEdit.date);
    }
  }, [expenseToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación 1: Campos vacíos o nulos
    if (!category || !amount || !date) {
      setError('Error: Todos los campos son obligatorios.');
      return;
    }

    // Validación 2: Fechas futuras
    const selectedDate = new Date(date);
    const today = new Date();
    // Ajuste de horas para comparar solo fechas correctamente
    today.setHours(0, 0, 0, 0); 
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate > today) {
      setError('Error: La fecha de gasto no puede ser superior a la actual.');
      return;
    }

    // Si pasa validaciones, limpiar error y enviar datos
    setError('');
    addOrUpdateExpense({
      id: expenseToEdit ? expenseToEdit.id : null,
      category,
      amount: Number(amount),
      date
    });

    // Limpiar formulario
    setCategory('');
    setAmount('');
    setDate('');
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <h3>{expenseToEdit ? 'Editar Gasto' : 'Registrar Nuevo Gasto'}</h3>
      
      {/* Mensajes de error por pantalla */}
      {error && <div className="error-message">{error}</div>}

      <div className="form-group">
        <label>Categoría de Gasto:</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Seleccione una categoría</option>
          <option value="Transporte">Transporte</option>
          <option value="Comida">Comida</option>
          <option value="Alojamiento">Alojamiento</option>
        </select>
      </div>

      <div className="form-group">
        <label>Monto ($):</label>
        <input 
          type="number" 
          value={amount} 
          onChange={(e) => setAmount(e.target.value)} 
          placeholder="Ej: 50000"
          min="1"
        />
      </div>

      <div className="form-group">
        <label>Fecha del Gasto:</label>
        <input 
          type="date" 
          value={date} 
          onChange={(e) => setDate(e.target.value)} 
        />
      </div>

      <div className="button-group">
        <button type="submit" className="btn-primary">
          {expenseToEdit ? 'Actualizar' : 'Guardar'}
        </button>
        {expenseToEdit && (
          <button type="button" className="btn-secondary" onClick={clearEdit}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default ExpenseForm;