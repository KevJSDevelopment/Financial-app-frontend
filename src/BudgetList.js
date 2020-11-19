import React from 'react'
import {Grid, makeStyles} from '@material-ui/core'
import BudgetCard from './BudgetCard'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import {useSelector, useDispatch} from 'react-redux'
import {openNewBudget} from './actions'

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

    return (
        <div>
            <Grid container alignItems="center" spacing={3}>
            {budgets.map(budget => {
                return  <BudgetCard budget={budget} key={budget.id}/>
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
