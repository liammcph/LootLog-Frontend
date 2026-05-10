import { useContext, useState, useEffect } from "react";
import { Routes, Route } from "react-router";
import { UserContext } from "./context/UserContext";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import SignInForm from "./components/SignInForm/SignInForm";
import * as authService from "./services/authService";


import React from 'react'
import { useContext, useState, useEffect } from 'react'
import { Routes, Route, useParams, useNavigate } from 'react-router-dom'

import * as incomeService from './services/incomeService'

import Navbar from './components/Nav/Navbar'
import Homepage from './components/Home/Homepage'
import Income from './components/Income/Income'
import Details from './components/IncomeDetails/Details'


const App = () => {
  const { incomeId } = useParams()
  const navigate = useNavigate()
  const [incomes, setIncomes] = useState([])
  
  
  const { user } = useContext(UserContext)

  useEffect(() => {
    const fetchIncomes = async () => {
      const incomeData = await incomeService.index();
      setIncomes(incomeData)
    }
    if (user) fetchIncomes() 
  }, [user])

  const handleAddIncome = async (incomeFormData) => {
    const newIncome = await incomeService.create(incomeFormData)
    setIncomes([newIncome, ...incomes])
  }

  const handleDeleteIncome = async (incomeId) => {
    const deletedIncome = await incomeService.deleteIncome(incomeId) 
    setIncomes(incomes.filter((income) => income._id !== deletedIncome._id))
  }

  const handleUpdateIncome = async (incomeId, incomeFormData) => {
    const updatedIncome = await incomeService.updateIncome(incomeId, incomeFormData)
    setIncomes(incomes.map((income) => (incomeId === income._id ? updatedIncome : income)))
  }

  return (
    <>
      
      <header>
        LootLog
        <Navbar />
      </header>
      <div>
      <Routes>
        <Route 
        path='/'
        element={<Homepage /> }
        />
        <Route 
        path="/income"
        element={<Income incomes={incomes} handleAddIncome={handleAddIncome} handleDeleteIncome={handleDeleteIncome} handleUpdateIncome={handleUpdateIncome} />}
        />
        <Route 
        path='/income/:incomeId'
        element={<Details incomes={incomes} />}
        />
      </Routes>
      </div>
    </>
  )
}

export default App