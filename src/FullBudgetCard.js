import React, {useEffect, useState} from 'react'
import {Grid, makeStyles, Button, CardHeader, Paper} from '@material-ui/core'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';

const useStyles = makeStyles((theme) => ({
    root: {
        width:"100%",
        backgroundColor: "white",
        '&:hover': {
            backgroundColor:"whitesmoke"
        }
    },
    header: {
        width: "100%", 
        borderBottom: "2px solid #62727b", 
        color: "#62727b", 
        borderRadius:"0 0 5px 5px", 
        textAlign: "center",
        backgroundColor: "white"
    },
  
  }));

const FullBudgetCard = (props) => {

    const classes = useStyles()
    const [balance, setBalance] = useState(0.00)
    
    const handleClick = () => {

    }
    
    const getBalance = async () => {
        const res = await fetch(`http://localhost:3000/budgets/${props.budget.id}`)
        const data = await res.json()
        let cost = 0.00
        // debugger
        if(data.expenseInfo.length > 0 || data.incomeInfo.length > 0){
            data.expenseInfo.expenses.forEach(expense => {
                cost += expense.cost
            })
            let income = 0.00
            data.incomeInfo.incomes.forEach(income => {
                income += income.value
            })
            setBalance(income - cost)
        }
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
                <CardHeader
                    title={`Finances for ${props.budget.date_from} - ${props.budget.date_from}`}
                    subheader={`Balance: ${balance}`}
                    style={{color: '#338a3e'}}
                />
            </Paper>
        </Grid>
    )
}

export default FullBudgetCard
