import React from 'react';
import { useState, useEffect } from 'react';
import * as expenseService from '../../services/expenseService';

import "./Expense.css";

const initialData = {
  name: '',
  amount: '',
  details: '',
};

const Expense = ({ expenses, handleDeleteExpense, handleUpdateExpense, user, ...props }) => {

  const [id, setId] = useState(null);
  const [formData, setFormData] = useState(initialData);
  const [showDetails, setShowDetails] = useState(false);

  const total = expenses.reduce((acc, expense) => acc + expense.amount, 0);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  const handleUpdate = (updateId) => {
    setId(updateId);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (id) {
      handleUpdateExpense(id, formData);
      setId(null);
    } else {
      props.handleAddExpense(formData);
      setFormData(initialData);
    }
  }

  useEffect(() => {
    const getExpense = async () => {
      const ExpenseData = await expenseService.show(id);
      setFormData(ExpenseData);
    }
    if (id) getExpense();
    return () => setFormData(initialData);
  }, [id])

  const addDetails = () => {
    if (showDetails === false) {
      setShowDetails(true);
    }
    if (showDetails === true) {
      setShowDetails(false);
    }
    console.log(showDetails);
  }

  const detailsShow = (expense) => {
    if (showDetails === true) {
      return <p id="details" style={{ position: "relative", right: "80vw", minWidth: "90vw", height: '10px' }}>Summary: {expense.details}</p>
    }
  }

  return (
    <>
      <h1 id="title">Monthly Expense</h1>
      <div id="expense-table">
        <div id="table-titling">
          <h3 id="label">Label</h3>
          <h3 id="amount" style={window.innerWidth > 900 ? { marginRight: '20vw' } : { marginRight: '17vw' }}>Amount / MO</h3>
        </div>
        <hr />
        {expenses.map((expense) => (
          <div key={expense._id} id="expense-display">
            <button onClick={() => addDetails()} style={{ textDecoration: 'none', color: 'black', backgroundColor: 'white', border: 'none' }}>
              <div id="display-info" style={showDetails ? { height: '15vh', alignItems: "start" } : { height: '6vh' }}>
                <p className="expense-info">{expense.name}</p>
                <p className="expense-info">－ ${expense.amount.toLocaleString()}</p>
              </div>
            </button>
            <div id="buttons">
              <button className="display-button" onClick={() => handleUpdate(expense._id)}><img className="btn-img" src="./edit-pencil.png" alt="pen" /></button>
              <button className="display-button" onClick={() => handleDeleteExpense(expense._id)}><img className="btn-img" src="./trashcan.png" alt="trashcan" /></button>
            </div>
            {detailsShow(expense)}
          </div>
        ))}
        <form onSubmit={handleSubmit}>
          <input onChange={handleChange} type="text" name="name" id="name" value={formData.name} placeholder='Label' required />

          <input onChange={handleChange} type="text" name="amount" id="amount" value={formData.amount} placeholder='$0' required />

          <textarea onChange={handleChange} name="details" id="details" value={formData.details} placeholder="Summary of Expense" rows="1"></textarea>

          <button type="submit">✚</button>
        </form>
        <div id="total">
          <h3>Total</h3>
          <h3>－ ${total.toLocaleString()} / Month</h3>
        </div>

      </div>

    </>
  )
}

export default Expense;