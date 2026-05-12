import React from 'react';
import { useState, useEffect } from 'react';

import * as goalService from '../../services/goalService';

import "./Goal.css";

const initialData = {
  name: '',
  goalAmount: '',
  savedAmount: 0,
};

const Goal = ({ goals, incomes, expenses, handleDeleteGoal, handleUpdateGoal, user, ...props }) => {

  const [id, setId] = useState(null);
  const [formData, setFormData] = useState(initialData);
 
  const monthlyGross = incomes.reduce((acc, income) => acc + income.amount, 0);
const monthlyExpense = expenses.reduce((acc, expense) => acc + expense.amount, 0);
const monthlyProfit = monthlyGross - monthlyExpense;


  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  const handleUpdate = (updateId) => {
    setId(updateId);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (id) {
      handleUpdateGoal(id, formData);
      setId(null);
    } else {
      props.handleAddGoal(formData);
      setFormData(initialData);
    }
  }

  useEffect(() => {
    const getGoal = async () => {
      const goalData = await goalService.show(id);
      setFormData(goalData);
    }
    if (id) getGoal();
    return () => setFormData(initialData);
  }, [id])


  return (
    <>
      <h1 id="title">Goal</h1>
      <div id="goal-table">
        <div id="table-titling">
          <h3 id="label">Label</h3>
        </div>
        <h2>Monthly Profit: ${monthlyProfit.toLocaleString()}</h2>
        <hr />
        {goals[0] ? (
  <div id="goal-display">
    <div id="display-info">
      <p className="goal-info">{goals[0].name}</p>
      <p className="goal-info">${goals[0].savedAmount.toLocaleString()} / ${goals[0].goalAmount.toLocaleString()}</p>
      <p className="goal-info">
        {monthlyProfit > 0
          ? `${((goals[0].goalAmount - goals[0].savedAmount) / monthlyProfit).toFixed(1)} months left`
          : 'Your expenses are greater than your income, decrease spending or increase income'}
      </p>
    </div>
    <div id="buttons">
      <button className="display-button" onClick={() => handleUpdate(goals[0]._id)}>
        <img className="btn-img" src="../src/assets/edit-pencil.png" alt="edit" />
      </button>
      <button className="display-button" onClick={() => handleDeleteGoal(goals[0]._id)}>
        <img className="btn-img" src="../src/assets/trashcan.png" alt="delete" />
      </button>
    </div>
    
  </div>
) : null}
        <form onSubmit={handleSubmit}>
          <input onChange={handleChange} type="text" name="name" id="name" value={formData.name} placeholder='Label' required />

          <input onChange={handleChange} type="text" name="goalAmount" id="amount" value={formData.goalAmount} placeholder='$0' required />

          <input onChange={handleChange} type="text" name="savedAmount" id="savedAmount" value={formData.savedAmount} placeholder='Saved So Far' />

          <button type="submit">✚</button>
        </form>
      </div>

    </>
  )
}

export default Goal;