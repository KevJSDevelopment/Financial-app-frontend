import React, {useEffect} from 'react'
import {Grid, makeStyles} from '@material-ui/core'
import BudgetCard from './BudgetCard'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import {useSelector, useDispatch} from 'react-redux'
import {openNewBudget} from './actions'
import {setBudgets} from './actions'

const useStyles = makeStyles({
    icon: {
      color: "white",
      backgroundColor: "#00ca00",
      '&:hover': {
        backgroundColor: "#59dd44",
      },
      marginLeft: "30%"
    },
    
});

const BudgetList = () => {
    // debugger
    const classes = useStyles()
    const budgets = useSelector(state => state.budgets)

    const dispatch = useDispatch()

    const getBudgets = async () => {
      const res = await fetch('http://localhost:3000/budgets', {
        headers: {"Authentication": `Bearer ${localStorage.getItem("token")}`}
      })
      const data = await res.json()
      dispatch(setBudgets(data.budgets))
    }
  
    useEffect(() => {
      getBudgets()
    }, [])

    return (
        <div>
            <Grid container alignItems="center" spacing={3}>
            {budgets.map(budget => {
                return  <BudgetCard budget={budget} getBudgets={getBudgets} key={budget.id}/>
            })}
            <Grid item xs={4}>
                <Fab onClick={() => dispatch(openNewBudget())} className={classes.icon} aria-label="add">
                  <AddIcon />
                </Fab>
            </Grid>
        </Grid>
      </div>
    )
}

export default BudgetList
