import React, { useEffect } from 'react'
import SimpleBudget from './SimpleBudget'
import FullPlan from './FullPlan'
import {useSelector, useDispatch} from 'react-redux'
import {setCurrentBudget} from './actions'
const ViewBudget = () => {

    const currentBudget = useSelector(state => state.currentBudget)
    const dispatch = useDispatch()

    const getPlanType = async () => {
        const res = await fetch(`http://localhost:3000/budgets/${localStorage.getItem("budgetId")}`)
        const data = await res.json()
        const budgetObject = { budget: data.budget, expenseInfo: data.expenseInfo }
        dispatch(setCurrentBudget(budgetObject))
    }

    useEffect(() => {
        getPlanType()
    }, [])

    return (
        <div>
            {currentBudget ? 
            currentBudget.plan_type !== "simple" ? <SimpleBudget /> : <FullPlan />
            : <div></div>} 
        </div>
    )
}

export default ViewBudget
  
