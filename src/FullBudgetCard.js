import React, {useEffect, useState} from 'react'
import {Grid, makeStyles, Button, CardHeader, Paper, CardContent} from '@material-ui/core'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import { currentBudget } from './reducers/budgets';
import {useSelector, useDispatch} from 'react-redux'
import {setPlanView, setAccounts, setComparePlan} from './actions'

const useStyles = makeStyles((theme) => ({
    root: {
        width:"100%",
    },
    header: {
        width: "100%", 
        borderBottom: "2px solid #62727b", 
        color: "#62727b", 
        borderRadius:"0 0 5px 5px", 
        textAlign: "center",
        backgroundColor: "white"
    },
    card: {
        backgroundColor: "white",
        '&:hover': {
            backgroundColor:"whitesmoke"
        }
    }
  
  }));

const FullBudgetCard = (props) => {

    const classes = useStyles()
    const accounts = useSelector(state => state.accounts)
    const [balance, setBalance] = useState(0.00)
    const [currentPlan, setCurrentPlan] = useState({})

    const dispatch = useDispatch()

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    })

    const viewDetails = () => {
        dispatch(setPlanView(currentPlan))
    }

    const compare = () => {
        dispatch(setComparePlan(currentPlan))
    }

    const getBalance = async () => {
        const res = await fetch(`http://localhost:3000/budgets/${props.budget.id}`)
        const data = await res.json()
        let costSum = 0.00
        let incomeSum = 0.00
        // debugger
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
        }
        setBalance(incomeSum - costSum)
        setCurrentPlan({budget: data.budget, expenseInfo: data.expenseInfo, incomeInfo: data.incomeInfo, balance: incomeSum - costSum})
    }

    useEffect(() => {
        getBalance()
    }, [])

    return (
        <Grid item xs={12}>
            <Paper elevation={3} className={classes.root}>
                <div className={classes.header}>
                    {props.budget.name}
                </div>
                <Card className={classes.card}>
                    <CardHeader
                        title={`Finances for ${props.budget.date_from} - ${props.budget.date_to}`}
                        subheader={`Balance: ${formatter.format(balance)}`}
                        style={{color: '#338a3e'}}
                        onClick={() => viewDetails()}
                        />
                    {accounts.length > 0 ? <CardContent>
                        <Button variant="contained" color="primary" onClick={() => compare()} style={{float: "right", marginBottom: "1%"}}>
                            Compare Transactions
                        </Button>
                    </CardContent> : null}
                </Card>
            </Paper>
        </Grid>
    )
}

export default FullBudgetCard
