import React from 'react'
import { useContext, useState, useEffect } from "react";
import { Routes, Route, useParams, useNavigate } from "react-router";
// import { UserContext } from "./context/UserContext";

import * as authService from "./services/authService";
import * as incomeService from './services/incomeService'

import Navbar from './components/Nav/Navbar'
import Homepage from './components/Home/Homepage'
import Income from './components/Income/Income'
import Details from './components/IncomeDetails/Details'
import SignUpForm from "./components/SignUpForm/SignUpForm";
import SignInForm from "./components/SignInForm/SignInForm";
import * as authService from "./services/authService";

import Navbar from "./Navbar/Navbar";
import Home from "./components/Home/Home";
import LootLog from "./components/LootLog/LootLog";

const App = () => {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = JSON.parse(atob(token.split(".")[1])).user;
      setUser(user);
    }
  }, [setUser]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="/sign-in" element={<SignInForm />} />
        <Route path="/lootlog" element={<LootLog />} />
      </Routes>
    </>
  );
};

export default App;

const App = () => {
  const { incomeId } = useParams()
  const navigate = useNavigate()
  const [incomes, setIncomes] = useState([])
  // const { user } = useContext(UserContext)

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