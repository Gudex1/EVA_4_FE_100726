const ExpenseList = ({ expenses, deleteExpense, editExpense }) => {
    // Límite de seguridad establecido en el requerimiento
    const SECURITY_LIMIT = 2000000; 
  
    if (expenses.length === 0) {
      return <div className="expense-list">No hay gastos registrados.</div>;
    }
  
    return (
      <div className="expense-list">
        <h3>Historial de Gastos</h3>
        <ul>
          {expenses.map((expense) => (
            <li 
              key={expense.id} 
              // Operador ternario para aplicar la clase de advertencia si supera el límite
              className={`expense-item ${expense.amount > SECURITY_LIMIT ? 'warning-limit' : ''}`}
            >
              <div className="expense-details">
                <span className="category-badge">{expense.category}</span>
                <strong>${expense.amount.toLocaleString('es-CL')}</strong>
                <span className="date-text">({expense.date})</span>
                
                {/* Indicador visual adicional en texto si excede el límite */}
                {expense.amount > SECURITY_LIMIT && (
                  <p className="warning-text">⚠️ Alerta: Gasto excede límite de seguridad</p>
                )}
              </div>
              <div className="action-buttons">
                <button onClick={() => editExpense(expense)} className="btn-edit">Editar</button>
                <button onClick={() => deleteExpense(expense.id)} className="btn-delete">Eliminar</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default ExpenseList;