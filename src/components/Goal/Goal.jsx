import React from 'react';

const Goal = ({incomes, expenses}) => {
    //--------------------------------------------
      const monthlyGross = incomes.reduce((acc, income) => acc + income.amount, 0);
      const monthlyExpense = expenses.reduce((acc, expense) => acc + expense.amount, 0);
      const monthlyProfit = monthlyGross - monthlyExpense
      const goal = 50000
      const meetGoal = goal / monthlyProfit
      //--------------------------------------------
  return (
    <>
    <h1>Monthly Profit: ${monthlyProfit.toLocaleString()}</h1>
    <h1>Goal: ${goal.toLocaleString()}</h1>
    <h2>Months until goal {meetGoal.toFixed(2)}</h2>
    </>
  )
}

export default Goal;