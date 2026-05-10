import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import * as incomeService from '../../services/incomeService.js'

const Details = () => {
    const { incomeId } = useParams()
    const [income, setIncome] = useState(null)

    useEffect(() => {
      const getIncome = async () => {
        const incomeData = await incomeService.show(incomeId);
        setIncome(incomeData);
      }
      getIncome();
    }, [incomeId])
    
    if (!income) return <><h1>Invalid Income code!!!</h1></>
  return (
    <>
    <h1>Income Details</h1>
    <h2>{income.name}</h2>
    <h3>${income.amount}</h3>
    <p>Summary: {income.details}</p>
    </>
  )
}

export default Details