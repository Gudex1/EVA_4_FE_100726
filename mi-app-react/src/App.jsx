import { useState, useEffect } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import './index.css';

function App() {
  // Inicialización del estado leyendo desde localStorage
  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem('gastosViaje');
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });

  const [expenseToEdit, setExpenseToEdit] = useState(null);

  // Efecto para guardar en localStorage cada vez que el arreglo 'expenses' cambia
  useEffect(() => {
    localStorage.setItem('gastosViaje', JSON.stringify(expenses));
  }, [expenses]);

  // Cálculo automático del total acumulado
  const totalExpenses = expenses.reduce((acc, curr) => acc + Number(curr.amount), 0);

  // Operación C: Create (y Update)
  const addOrUpdateExpense = (expenseData) => {
    if (expenseToEdit) {
      setExpenses(expenses.map(exp => exp.id === expenseData.id ? expenseData : exp));
      setExpenseToEdit(null);
    } else {
      setExpenses([...expenses, { ...expenseData, id: Date.now().toString() }]);
    }
  };

  // Operación D: Delete
  const deleteExpense = (id) => {
    setExpenses(expenses.filter(exp => exp.id !== id));
  };

  // Preparar Operación U: Update
  const editExpense = (expense) => {
    setExpenseToEdit(expense);
  };

  return (
    <div className="container">
      <h1>Calculadora de Presupuesto de Viaje</h1>
      
      {/* Muestra el total acumulado de los gastos en pantalla */}
      <div className="total-container">
        <h2>Total Acumulado: ${totalExpenses.toLocaleString('es-CL')}</h2>
      </div>

      <div className="grid-layout">
        <ExpenseForm 
          addOrUpdateExpense={addOrUpdateExpense} 
          expenseToEdit={expenseToEdit} 
          clearEdit={() => setExpenseToEdit(null)}
        />
        <ExpenseList 
          expenses={expenses} 
          deleteExpense={deleteExpense} 
          editExpense={editExpense} 
        />
      </div>
    </div>
  );
}

export default App;