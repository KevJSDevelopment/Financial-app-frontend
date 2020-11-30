import React, {useEffect} from 'react'
import {Paper, Button} from '@material-ui/core'
import {useSelector, useDispatch} from 'react-redux'
import {setExpectedIncomesArray, setExpectedExpensesArray, setActualIncomesArray, setActualExpensesArray, setIncomeCategories, setExpenseCategories, setComparePlan, setExpenseKeys, setIncomeKeys, setIncomeData, setExpenseData, setLoading} from './actions'
import LineGraph from './LineGraph'
import BarGraph from './BarGraph'
import { transactions } from './reducers/categories'

const ComparePlan = () => {

    const comparePlan = useSelector(state => state.comparePlan)
    const expectedIncomesArray = useSelector(state => state.expectedIncomesArray)
    const expectedExpensesArray = useSelector(state => state.expectedExpensesArray)
    const actualIncomesArray = useSelector(state => state.actualIncomesArray)
    const actualExpensesArray = useSelector(state => state.actualExpensesArray)
    const incomeCategories = useSelector(state => state.incomeCategories)
    const expenseCategories = useSelector(state => state.expenseCategories)
    const displayLine = useSelector(state => state.displayLine)
    const accounts = useSelector(state => state.accounts)
    const incomeKeys = useSelector(state => state.incomeKeys)
    const expenseKeys = useSelector(state => state.expenseKeys)
    const incomeData = useSelector(state => state.incomeData)
    const expenseData = useSelector(state => state.expenseData)
    const loading = useSelector(state => state.loading)
    const dispatch = useDispatch()

    const incomeLineData = [
        {
          "id": "Expected",
          "color": "hsl(154, 70%, 50%)",
          "data": expectedIncomesArray
        },
        {
          "id": "Actual",
          "color": "hsl(135, 70%, 50%)",
          "data": actualIncomesArray
        }
    ]

    const expenseLineData = [
        {
          "id": "Expected",
          "color": "hsl(154, 70%, 50%)",
          "data": expectedExpensesArray
        },
        {
          "id": "Actual",
          "color": "hsl(135, 70%, 50%)",
          "data": actualExpensesArray
        }
      ]

    const getBarInfo = async () => {
        const meta = {
            method: "POST",
            headers: {"Content-Type":"application/json", "Authentication": `Bearer ${localStorage.getItem("token")}`},
            body: JSON.stringify({plan: comparePlan, accounts: accounts})
        }
        const res = await fetch(`http://localhost:3000/bar_comparison`, meta)
        const data = await res.json()

        dispatch(setIncomeData(data.incomeData))
        dispatch(setExpenseData(data.expenseData))
        dispatch(setIncomeKeys(data.incomeKeys))
        dispatch(setExpenseKeys(data.expenseKeys))
    }

    const getLineInfo = () => {
        
    }
    // dispatch(setIncomeCategories(incomeCatList))
    // dispatch(setExpenseCategories(expenseCatList))
    // dispatch(setExpectedExpensesArray(expenseObjArray))
    // dispatch(setExpectedIncomesArray(incomeObjArray))
    
    // dispatch(setActualIncomesArray(incomeObjArr))
    // dispatch(setActualExpensesArray(expenseObjArr))

    const loaded = () => {
        dispatch(setLoading(false))
    }
    useEffect(() => {
        getBarInfo()
        getLineInfo()
        window.setTimeout(loaded, 3000)
    }, [])

    return (
        <div style={{width: "100%"}}>
            {!loading ? <div style={{width: "100%"}}>
                <Button variant="contained" color="secondary" size="small" style={{borderTopLeftRadius: "35px"}} onClick={() => dispatch(setComparePlan(null))}>
                    Back
                </Button>
                <br/>
                <Paper elevation={3} style={{height: "300px", width: "100%", backgroundColor: "white"}} color="primary">
                    {!displayLine ? <LineGraph data={incomeLineData} /> : <BarGraph data={incomeData} keys={incomeKeys}/> }
                </Paper>  
                <br/>
                <Paper elevation={3} style={{height: "300px", width: "100%", backgroundColor: "white"}} color="primary">
                    {!displayLine ? <LineGraph data={expenseLineData} /> : <BarGraph data={expenseData} keys={expenseKeys}/> }
                </Paper>  
            </div> : <div> Loading... </div> }
        </div>
    )
}

export default ComparePlan
