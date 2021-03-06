import React, {useEffect} from 'react'
import {Paper, Button, Switch, makeStyles, Typography, CircularProgress} from '@material-ui/core'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import {useSelector, useDispatch} from 'react-redux'
import {setComparePlan, setExpenseKeys, setIncomeKeys, setIncomeData, setExpenseData, setLoading, setIncomeLineData,setExpenseLineData, setDisplayLine, setBalance, setBankBalance} from './actions'
import LineGraph from './LineGraph'
import BarGraph from './BarGraph'
import Grow from '@material-ui/core/Grow';

const useStyles = makeStyles({
    button: {
        borderTopLeftRadius: "25px"
    }
})

const ComparePlan = () => {

    const comparePlan = useSelector(state => state.comparePlan)
    const displayLine = useSelector(state => state.displayLine)
    const accounts = useSelector(state => state.accounts)
    const incomeKeys = useSelector(state => state.incomeKeys)
    const expenseKeys = useSelector(state => state.expenseKeys)
    const incomeData = useSelector(state => state.incomeData)
    const expenseData = useSelector(state => state.expenseData)
    const incomeLineData = useSelector(state => state.incomeLineData)
    const expenseLineData = useSelector(state => state.expenseLineData)
    const balance = useSelector(state => state.balance)
    const bankBalance = useSelector(state => state.bankBalance)
    const loading = useSelector(state => state.loading)

    const classes = useStyles()
    const dispatch = useDispatch()

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    })

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

    const getBalance = async () => {
        const res = await fetch(`http://localhost:3000/budgets/${comparePlan.budget.id}`)
        const data = await res.json()
        let costSum = 0.00
        let incomeSum = 0.00
        
        if(data.expenseInfo.length > 0){
            data.expenseInfo.forEach(category => {
                category.expenses.forEach(expense => {
                        costSum += expense.cost
                })
            })
        }
        if(data.incomeInfo.length > 0){ 
            data.incomeInfo.forEach(category => {
                category.incomes.forEach(income=> {
                        incomeSum += income.value
                })
            })
            dispatch(setBalance((incomeSum - costSum)))
        }
        let balance = 0.00
        accounts.map((account) => {
          account.transactions.map((transaction) => {
              balance += transaction.transaction.value
          })
        })

        dispatch(setBankBalance(balance))
    }

    const getLineInfo = async () => {
        const meta = {
            method: "POST",
            headers: {"Content-Type":"application/json", "Authentication": `Bearer ${localStorage.getItem("token")}`},
            body: JSON.stringify({plan: comparePlan, accounts: accounts})
        }
        const res = await fetch(`http://localhost:3000/line_comparison`, meta)
        const data = await res.json()
        
        dispatch(setIncomeLineData(data.incomeData))
        dispatch(setExpenseLineData(data.expenseData))
    }

    const handleDisplay = () => {
        dispatch(setDisplayLine(!displayLine))
    }

    const handleBack = () => {
        dispatch(setLoading(true))
        dispatch(setDisplayLine(false))
        dispatch(setComparePlan(null))
    }
    const loaded = () => {
        dispatch(setDisplayLine(false))
        dispatch(setLoading(false))
    }

    useEffect(() => {
        getBarInfo()
        getLineInfo()
        getBalance()
        window.setTimeout(loaded, 2000)
    }, [])

    return (
        <div style={{width: "100%"}}>
            {!loading ? <div style={{width: "100%"}}>
                    <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        className={classes.button}
                        startIcon={<NavigateBeforeIcon />}
                        onClick={() => handleBack()}
                    >
                        Back
                    </Button>
                    <Switch
                        checked={displayLine}
                        onChange={handleDisplay}
                        name="Graph Display"
                        color="secondary"
                    />
                <br/>
                <Paper elevation={3} style={{width: "100%", backgroundColor: "white", textAlign: "center"}} color="primary">
                    <Typography variant="overline" color="primary">
                            Expected Balance: {formatter.format(balance)} - Actual Balance: {formatter.format(bankBalance)}
                    </Typography>
                </Paper>
                <br/>

                <Grow in={true}>
                    <Paper elevation={3} style={{height: "300px", width: "100%", backgroundColor: "white"}} color="primary">
                        {displayLine ? <LineGraph data={incomeLineData} type="Income" /> : <BarGraph data={incomeData} keys={incomeKeys} type="Income" /> }
                    </Paper>  
                </Grow>
                <br/>
                <Grow
                in={true}
                style={{ transformOrigin: '0 0 0' }}
                {...(true ? { timeout: 1000 } : {})}
                >
                    <Paper elevation={3} style={{height: "300px", width: "100%", backgroundColor: "white"}} color="primary">
                        {displayLine ? <LineGraph data={expenseLineData} type="Expense" /> : <BarGraph data={expenseData} keys={expenseKeys} type="Expense" /> }
                    </Paper>  
                </Grow>
            </div> 
            : 
            <div style={{height: window.innerHeight, textAlign:"center"}}>
                <CircularProgress style={{marginTop: "25%"}}color="primary"/> 
            </div>
            }
        </div>
    )
}

export default ComparePlan
