import React from 'react';
import { useState, useEffect } from 'react';

import * as incomeService from '../../services/incomeService';

import "./Income.css";

const initialData = {
  name: '',
  amount: '',
  details: '',
};

const Income = ({ incomes, handleDeleteIncome, handleUpdateIncome, user, ...props }) => {

  const [id, setId] = useState(null);
  const [formData, setFormData] = useState(initialData);
  const [showDetails, setShowDetails] = useState(false);

  const total = incomes.reduce((acc, income) => acc + income.amount, 0);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  const handleUpdate = (updateId) => {
    setId(updateId);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (id) {
      handleUpdateIncome(id, formData);
      setId(null);
    } else {
      props.handleAddIncome(formData);
      setFormData(initialData);
    }
  }

  useEffect(() => {
    const getIncome = async () => {
      const incomeData = await incomeService.show(id);
      setFormData(incomeData);
    }
    if (id) getIncome();
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

  const detailsShow = (income) => {
    if (showDetails === true) {
      return <p id="details" style={{ position: "relative", right: "80vw", minWidth: "90vw", height: '10px' }}>Summary: {income.details}</p>
    }
  }

  return (
    <>
      <h1 id="title">Monthly Income</h1>
      <div id="income-table">
        <div id="table-titling">
          <h3 id="label">Label</h3>
          <h3 id="amount" style={window.innerWidth > 900 ? { marginRight: '20vw' } : { marginRight: '17vw' }}>Amount / MO</h3>
        </div>
        <hr />
        {incomes.map((income) => (
          <div key={income._id} id="income-display">
            <button onClick={() => addDetails()} style={{ textDecoration: 'none', color: 'black', backgroundColor: 'white', border: 'none' }}>
              <div id="display-info" style={showDetails ? { height: '15vh', alignItems: "start" } : { height: '6vh' }}>
                <p className="income-info">{income.name}</p>
                <p className="income-info">${income.amount.toLocaleString()}</p>
              </div>
            </button>
            <div id="buttons">
              <button className="display-button" onClick={() => handleUpdate(income._id)}><img className="btn-img" src="../src/assets/edit-pencil.png" alt="pen" /></button>
              <button className="display-button" onClick={() => handleDeleteIncome(income._id)}><img className="btn-img" src="../src/assets/trashcan.png" alt="trashcan" /></button>
            </div>
            {detailsShow(income)}
          </div>
        ))}
        <form onSubmit={handleSubmit}>
          <input onChange={handleChange} type="text" name="name" id="name" value={formData.name} placeholder='Label' required />

          <input onChange={handleChange} type="text" name="amount" id="amount" value={formData.amount} placeholder='$0' required />

          <textarea onChange={handleChange} name="details" id="details" value={formData.details} placeholder="Summary of Income" rows="1"></textarea>

          <button type="submit">✚</button>
        </form>
        <div id="total">
          <h3>Total</h3>
          <h3>${total.toLocaleString()} / Month</h3>
        </div>

      </div>

    </>
  )
}

export default Income;