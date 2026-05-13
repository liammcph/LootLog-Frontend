// import React from 'react';
import { useContext, useState, useEffect } from "react";
import { Routes, Route } from "react-router";
import { UserContext } from "./context/UserContext";

import * as incomeService from './services/incomeService';
import * as expenseService from './services/expenseService';
import * as goalService from './services/goalService';


import Navbar from './components/Nav/Navbar';
import Homepage from './components/Home/Homepage';
import Income from './components/Income/Income';
import Expense from './components/Expense/Expense';
import Goal from './components/Goal/Goal';
import SignUpForm from "./components/SignUpForm/SignUpForm";
import SignInForm from "./components/SignInForm/SignInForm";

const App = () => {

  const { user, setUser } = useContext(UserContext);
    const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = JSON.parse(atob(token.split(".")[1])).user;
      setUser(user);
    }
  }, [setUser])

  useEffect(() => {
    const fetchIncomes = async () => {
      const data = await incomeService.index();
      const incomeData = data.filter((item) => item.author._id === user._id);
      setIncomes(incomeData);
    }
    if (user) fetchIncomes();
  }, [user])

  const handleAddIncome = async (incomeFormData) => {
    const newIncome = await incomeService.create(incomeFormData);
    setIncomes([newIncome, ...incomes]);
  }

  const handleDeleteIncome = async (incomeId) => {
    const deletedIncome = await incomeService.deleteIncome(incomeId);
    setIncomes(incomes.filter((income) => income._id !== deletedIncome._id));
  }

  const handleUpdateIncome = async (incomeId, incomeFormData) => {
    const updatedIncome = await incomeService.updateIncome(incomeId, incomeFormData);
    setIncomes(incomes.map((income) => (incomeId === income._id ? updatedIncome : income)));
  }

  useEffect(() => {
    const fetchExpenses = async () => {
      const data = await expenseService.index();
      const expenseData = data.filter((item) => item.author._id === user._id);
      setExpenses(expenseData);
    }
    if (user) fetchExpenses();
  }, [user])

  const handleAddExpense = async (expenseFormData) => {
    const newExpense = await expenseService.create(expenseFormData);
    setExpenses([newExpense, ...expenses]);
  }

  const handleDeleteExpense = async (expenseId) => {
    const deletedExpense = await expenseService.deleteExpense(expenseId);
    setExpenses(expenses.filter((expense) => expense._id !== deletedExpense._id));
  }

  const handleUpdateExpense = async (expenseId, expenseFormData) => {
    const updatedExpense = await expenseService.updateExpense(expenseId, expenseFormData);
    setExpenses(expenses.map((expense) => (expenseId === expense._id ? updatedExpense : expense)));
  }

    useEffect(() => {
    const fetchGoals = async () => {
      const data = await goalService.index();
      const goalData = data.filter((item) => item.author._id === user._id);
      setGoals(goalData);
    }
    if (user) fetchGoals();
  }, [user])

  const handleAddGoal = async (goalFormData) => {
    const newGoal = await goalService.create(goalFormData);
    setGoals([newGoal, ...goals]);
  }

  const handleDeleteGoal = async (goalId) => {
    const deletedGoal = await goalService.deleteGoal(goalId);
    setGoals(goals.filter((goal) => goal._id !== deletedGoal._id));
  }

  const handleUpdateGoal = async (goalId, goalFormData) => {
    const updatedGoal = await goalService.updateGoal(goalId, goalFormData);
    setGoals(goals.map((goal) => (goalId === goal._id ? updatedGoal : goal)));
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
            element={<Homepage />}
          />
          {user && (
            <Route
              path="/income"
              element={<Income
                incomes={incomes}
                handleAddIncome={handleAddIncome}
                handleDeleteIncome={handleDeleteIncome}
                handleUpdateIncome={handleUpdateIncome}
              />}
            />
          )}
          {user && (
            <Route
              path="/expense"
              element={<Expense
                expenses={expenses}
                handleAddExpense={handleAddExpense}
                handleDeleteExpense={handleDeleteExpense}
                handleUpdateExpense={handleUpdateExpense}
              />}
            />
          )}
          {user && (
            <Route
              path="/goal"
              element={<Goal
                incomes={incomes}
                expenses={expenses}
                goals={goals}
                handleAddGoal={handleAddGoal}
                handleDeleteGoal={handleDeleteGoal}
                handleUpdateGoal={handleUpdateGoal}
              />}
            />
          )}
          <Route
            path='/sign-up'
            element={<SignUpForm />}
          />
          <Route
            path='/sign-in'
            element={<SignInForm />}
          />
        </Routes>
      </div>
    </>
  )
}

export default App;