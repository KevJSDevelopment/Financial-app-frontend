import React, {useEffect, useState} from 'react'
import {Grid, makeStyles, Button, CardHeader, Paper, CardContent, Slide} from '@material-ui/core'
import Card from '@material-ui/core/Card';
import {useSelector, useDispatch} from 'react-redux'
import {setPlanView, setBalance, setComparePlan} from './actions'

const useStyles = makeStyles({
    root: {
        width:"100%",
        '&:hover':{
            border: "1px solid #aed581",
        },
    },
    header: {
        width: "100%", 
        borderBottom: "2px solid #7e858d", 
        color: "#7e858d", 
        borderRadius:"0 0 5px 5px", 
        textAlign: "center",
        backgroundColor: "white"
    },
    card: {
        backgroundColor: "white",
        '&:hover': {
            backgroundColor:"whitesmoke",
        }
    }
  
  });

const FullBudgetCard = (props) => {

    const classes = useStyles()
    const accounts = useSelector(state => state.accounts)
    const [thisBalance, setThisBalance] = useState(0.00)
    const [currentPlan, setCurrentPlan] = useState({})
    const [hover, setHover] = useState(false)

    
    const dispatch = useDispatch()
    
    const handleHover = (bool) => {
      setHover(bool)
    }
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    })

    const viewDetails = () => {
        dispatch(setPlanView(currentPlan))
    }

    const compare = () => {
        dispatch(setBalance(thisBalance))
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
        setThisBalance(incomeSum - costSum)
        setCurrentPlan({budget: data.budget, expenseInfo: data.expenseInfo, incomeInfo: data.incomeInfo, balance: incomeSum - costSum})
    }

    useEffect(() => {
        getBalance()
    }, [])

    return (
        <Grid item xs={12}>
            <Slide 
            in={true} 
            direction="up"
            {...(true ? { timeout: (props.count + 5) * 100 } : {})}
            >
            <Paper className={classes.root} elevation={!hover ? 3 : 20} onMouseOver={() => handleHover(true)} onMouseLeave={() => handleHover(false)}>
                <div className={classes.header}>
                    {props.budget.name}
                </div>
                <Card className={classes.card}>
                    <CardHeader
                        title={`Finances for ${props.budget.date_from} - ${props.budget.date_to}`}
                        subheader={`Balance: ${formatter.format(thisBalance)}`}
                        style={{color: '#7da453'}}
                        onClick={() => viewDetails()}
                        />
                    {accounts.length > 0 ? <CardContent>
                        <Button variant="contained" color="primary" onClick={() => compare()} style={{float: "right", marginBottom: "1%"}}>
                            Compare Transactions
                        </Button>
                    </CardContent> : null}
                </Card>
            </Paper>
            </Slide>
        </Grid>
    )
}

export default FullBudgetCard
